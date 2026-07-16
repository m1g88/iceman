-- Seed expense categories (matches spreadsheet workbook)
INSERT INTO expense_categories (name, group_name) VALUES
  ('Water', 'Production'),
  ('Power', 'Production'),
  ('Bags', 'Production'),
  ('Machine repair', 'Production'),
  ('Fuel', 'Distribution'),
  ('Vehicle repair', 'Distribution'),
  ('Driver pay', 'Distribution'),
  ('Rent', 'Overhead'),
  ('Permits', 'Overhead'),
  ('Insurance', 'Overhead'),
  ('Other', 'Overhead')
ON CONFLICT (name) DO NOTHING;

INSERT INTO routes (name) VALUES
  ('Route_01'), ('Route_02'), ('Route_03'),
  ('Route_04'), ('Route_05'), ('Route_06')
ON CONFLICT (name) DO NOTHING;

INSERT INTO stores (name) VALUES
  ('Store_01'), ('Store_02'), ('Store_03'), ('Store_04'), ('Store_05'),
  ('Store_06'), ('Store_07'), ('Store_08'), ('Store_09'), ('Store_10')
ON CONFLICT (name) DO NOTHING;
