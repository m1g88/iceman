# Ice Business — Domain Glossary

Bilingual terms used in the ice cube production & distribution ledger.

## Core concepts

| English | Thai | Meaning |
|---------|------|---------|
| Route | เส้นทาง | A delivery run — one driver, one set of stores, one day |
| Store | ร้านค้า | A shop or restaurant you deliver ice to |
| Bag | ถุง | Standard unit of ice sold (single size) |
| Cash sale | ขายเงินสด | Store pays on delivery — money in hand same day |
| Credit sale | ขายเชื่อ / ค้างจ่าย | Store takes ice now, pays later — adds to store balance |
| Store balance | ยอดค้างจ่าย | Total amount a store still owes you |
| Store payment | รับชำระ | When a store pays down (or clears) their balance |
| Production cost | ต้นทุนผลิต | Water, power, bags, machine repair |
| Distribution cost | ต้นทุนขนส่ง | Fuel, vehicle, driver pay |
| Overhead | ค่าใช้จ่ายทั่วไป | Rent, permits, insurance |

## Income channels

| Channel | How recorded |
|---------|----------------|
| Route cash | `Route_Sales` row with Sale type = Cash |
| Route credit | `Route_Sales` row with Sale type = Credit |
| Store payment | `Store_Payments` when credit customer pays |

## Important distinction

- **Income (P&L):** Cash + Credit sales count when ice is delivered.
- **Cash flow:** Only Cash sales and Store payments increase cash on hand. Credit sales do not — until the store pays.

## Adding new names

Always add new route or store names on the **Settings** tab first. Dropdowns on other tabs read from that list.
