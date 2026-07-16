-- Iceman ledger schema (Phase 1)

CREATE TYPE sale_type AS ENUM ('cash', 'credit');
CREATE TYPE payment_method AS ENUM ('cash', 'bank');
CREATE TYPE user_role AS ENUM ('owner', 'bookkeeper', 'driver');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'bookkeeper',
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE organization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opening_cash_thb NUMERIC(12, 2) NOT NULL DEFAULT 0,
  opening_bank_thb NUMERIC(12, 2) NOT NULL DEFAULT 0,
  go_live_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO organization (opening_cash_thb, opening_bank_thb) VALUES (0, 0);

CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL
);

CREATE TABLE store_opening_debts (
  store_id UUID PRIMARY KEY REFERENCES stores(id) ON DELETE CASCADE,
  amount_thb NUMERIC(12, 2) NOT NULL DEFAULT 0
);

CREATE TABLE route_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_date DATE NOT NULL,
  route_id UUID NOT NULL REFERENCES routes(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  bags INT NOT NULL CHECK (bags >= 0),
  sale_type sale_type NOT NULL,
  amount_thb NUMERIC(12, 2) NOT NULL CHECK (amount_thb >= 0),
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX route_sales_sale_date_idx ON route_sales (sale_date);
CREATE INDEX route_sales_store_id_idx ON route_sales (store_id);

CREATE TABLE store_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_date DATE NOT NULL,
  store_id UUID NOT NULL REFERENCES stores(id),
  amount_thb NUMERIC(12, 2) NOT NULL CHECK (amount_thb > 0),
  payment_method payment_method NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX store_payments_payment_date_idx ON store_payments (payment_date);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_date DATE NOT NULL,
  category_id UUID NOT NULL REFERENCES expense_categories(id),
  amount_thb NUMERIC(12, 2) NOT NULL CHECK (amount_thb > 0),
  payment_method payment_method NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX expenses_expense_date_idx ON expenses (expense_date);

CREATE TABLE inventory_weeks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_ending DATE NOT NULL UNIQUE,
  bags_produced INT NOT NULL CHECK (bags_produced >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Computed views

CREATE VIEW store_balances AS
SELECT
  s.id AS store_id,
  s.name AS store_name,
  COALESCE(sod.amount_thb, 0) AS opening_debt_thb,
  COALESCE(credit.total, 0) AS credit_sales_thb,
  COALESCE(pay.total, 0) AS payments_thb,
  COALESCE(sod.amount_thb, 0)
    + COALESCE(credit.total, 0)
    - COALESCE(pay.total, 0) AS still_owed_thb
FROM stores s
LEFT JOIN store_opening_debts sod ON sod.store_id = s.id
LEFT JOIN (
  SELECT store_id, SUM(amount_thb) AS total
  FROM route_sales
  WHERE sale_type = 'credit'
  GROUP BY store_id
) credit ON credit.store_id = s.id
LEFT JOIN (
  SELECT store_id, SUM(amount_thb) AS total
  FROM store_payments
  GROUP BY store_id
) pay ON pay.store_id = s.id
WHERE s.active = true
ORDER BY still_owed_thb DESC, s.name;

CREATE VIEW monthly_pl AS
SELECT
  date_trunc('month', d.month_date)::date AS month_start,
  COALESCE(rs.cash_income, 0) AS route_cash_income_thb,
  COALESCE(rs.credit_income, 0) AS route_credit_income_thb,
  COALESCE(rs.cash_income, 0) + COALESCE(rs.credit_income, 0) AS total_income_thb,
  COALESCE(ex.total_expenses, 0) AS total_expenses_thb,
  COALESCE(rs.cash_income, 0) + COALESCE(rs.credit_income, 0) - COALESCE(ex.total_expenses, 0) AS net_thb
FROM (
  SELECT generate_series(
    date_trunc('month', COALESCE((SELECT MIN(sale_date) FROM route_sales), CURRENT_DATE)),
    date_trunc('month', CURRENT_DATE),
    interval '1 month'
  )::date AS month_date
) d
LEFT JOIN (
  SELECT
    date_trunc('month', sale_date)::date AS month_start,
    SUM(amount_thb) FILTER (WHERE sale_type = 'cash') AS cash_income,
    SUM(amount_thb) FILTER (WHERE sale_type = 'credit') AS credit_income
  FROM route_sales
  GROUP BY 1
) rs ON rs.month_start = d.month_date
LEFT JOIN (
  SELECT date_trunc('month', expense_date)::date AS month_start, SUM(amount_thb) AS total_expenses
  FROM expenses
  GROUP BY 1
) ex ON ex.month_start = d.month_date
ORDER BY month_start DESC;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, display_name)
  VALUES (NEW.id, 'bookkeeper', COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_opening_debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_weeks ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE POLICY profiles_select ON profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.user_role() = 'owner');

CREATE POLICY profiles_update_owner ON profiles FOR UPDATE TO authenticated
  USING (public.user_role() = 'owner');

CREATE POLICY org_select ON organization FOR SELECT TO authenticated USING (true);
CREATE POLICY org_update_owner ON organization FOR UPDATE TO authenticated
  USING (public.user_role() = 'owner');

CREATE POLICY routes_select ON routes FOR SELECT TO authenticated USING (true);
CREATE POLICY routes_write ON routes FOR ALL TO authenticated
  USING (public.user_role() IN ('owner', 'bookkeeper'))
  WITH CHECK (public.user_role() IN ('owner', 'bookkeeper'));

CREATE POLICY stores_select ON stores FOR SELECT TO authenticated USING (true);
CREATE POLICY stores_write ON stores FOR ALL TO authenticated
  USING (public.user_role() IN ('owner', 'bookkeeper'))
  WITH CHECK (public.user_role() IN ('owner', 'bookkeeper'));

CREATE POLICY categories_select ON expense_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY categories_write_owner ON expense_categories FOR ALL TO authenticated
  USING (public.user_role() = 'owner')
  WITH CHECK (public.user_role() = 'owner');

CREATE POLICY opening_debts_select ON store_opening_debts FOR SELECT TO authenticated USING (true);
CREATE POLICY opening_debts_write_owner ON store_opening_debts FOR ALL TO authenticated
  USING (public.user_role() = 'owner')
  WITH CHECK (public.user_role() = 'owner');

CREATE POLICY route_sales_select ON route_sales FOR SELECT TO authenticated USING (true);
CREATE POLICY route_sales_write ON route_sales FOR ALL TO authenticated
  USING (public.user_role() IN ('owner', 'bookkeeper'))
  WITH CHECK (public.user_role() IN ('owner', 'bookkeeper'));

CREATE POLICY store_payments_select ON store_payments FOR SELECT TO authenticated USING (true);
CREATE POLICY store_payments_write ON store_payments FOR ALL TO authenticated
  USING (public.user_role() IN ('owner', 'bookkeeper'))
  WITH CHECK (public.user_role() IN ('owner', 'bookkeeper'));

CREATE POLICY expenses_select ON expenses FOR SELECT TO authenticated USING (true);
CREATE POLICY expenses_write ON expenses FOR ALL TO authenticated
  USING (public.user_role() IN ('owner', 'bookkeeper'))
  WITH CHECK (public.user_role() IN ('owner', 'bookkeeper'));

CREATE POLICY inventory_select ON inventory_weeks FOR SELECT TO authenticated USING (true);
CREATE POLICY inventory_write ON inventory_weeks FOR ALL TO authenticated
  USING (public.user_role() IN ('owner', 'bookkeeper'))
  WITH CHECK (public.user_role() IN ('owner', 'bookkeeper'));

GRANT SELECT ON store_balances TO authenticated;
GRANT SELECT ON monthly_pl TO authenticated;
