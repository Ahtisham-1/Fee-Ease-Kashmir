# Fee-Ease Kashmir

> A micro-payment fee management system built for private schools in Kashmir.

## The Problem

Private schools in Kashmir collect fees in large monthly lump-sums — often between ₹3,000 and ₹5,000 at once. But most Kashmiri families do not earn a fixed monthly salary. Their income is daily, weekly, or seasonal — from agriculture, tourism, handicrafts, or local trade.

Asking a father who earns ₹300 a day to produce ₹5,000 on the 10th of every month is a direct path to default. Schools suffer irregular cash flow, struggle to pay teachers on time, and resort to embarrassing students in class over unpaid fees.

---

## The Solution

Fee-Ease Kashmir aligns the school's billing with the parent's actual cash flow.

Instead of one heavy payment, parents make **micro-payments (Qists)** — ₹100 on Monday, ₹200 on Wednesday, ₹150 on Friday. The app tracks every payment in real-time, applies them sequentially across months using FIFO logic, and shows parents exactly where they stand at any moment.

No more guessing. No more embarrassment. No more defaults.

---

## Features

### For Parents
- **Live Balance Dashboard** — Total fees, total paid, and net balance remaining, updated after every payment
- **Micro-Payment System** — Pay any amount at any time with instant validation
- **Transaction History** — Full chronological list of all payments made
- **Itemized Month-by-Month Ledger** — See exactly which months are Paid and which are Pending, with outstanding amounts per month

### For School Admin
- **Collections Dashboard** — Total money collected today, this month, and this year
- **Defaulter List** — Every student with a pending balance, listed with their parent name and exact amount owed
- **Parent Registration** — Add new parents with auto-generated IDs
- **Student Registration** — Register new students linked to their parent, assigned to a class
- **Fee Assignment** — Assign a new month's fees to all students in one click
- **Academic Year Promotion Tool** — Bulk-promote students to the next class with selective unchecking for students repeating a year

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS |
| Logic | Vanilla JavaScript (ES6+) |
| Modules | ES6 Modules (import/export) |
| Storage | LocalStorage |
| Type Safety | TypeScript (migration in progress) |
| Deployment | Vercel |

---

## Live Demo

[https://fee-ease-kashmir.vercel.app/](https://fee-ease-kashmir.vercel.app/)

---

## Project Structure

```
├── index.html          # Main HTML file
├── style.css           # All styling
├── data.js             # Data arrays (Students, Parents, Fees, Transactions)
├── storage.js          # LocalStorage persistence layer
├── script.js           # DOM logic, event listeners, dashboard functions
└── tsconfig.json       # TypeScript compiler configuration
```

---

## The Business Case

This is not a practice project. Kashmir's private school sector runs on paper registers and manual receipts. FeeEase digitizes this entirely and reduces default rates by enabling payment flexibility that matches how families actually earn.

The pitch to a school principal is not "convenient for parents" — it is **financial survival for the school**: predictable daily cash flow instead of zero for three months and then a sudden burst.

---

## Roadmap

- [x] Phase 1 — Vanilla JavaScript (Complete)
- [ ] Phase 2 — TypeScript Migration (In Progress)
- [ ] Phase 3 — React Rebuild
- [ ] Phase 4 — Node.js + MongoDB Backend
- [ ] Phase 5 — Payment Gateway Integration (Razorpay/UPI)
- [ ] Phase 6 — Production Launch

---

## Author

Built by a self-taught developer from Kashmir, solving a real problem in his own community.

GitHub: [github.com/Ahtisham-1](https://github.com/Ahtisham-1)