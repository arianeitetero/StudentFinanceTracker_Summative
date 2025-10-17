# Student Finance Tracker

A web app to help students track expenses, budgets, and spending trends.  
Built with **HTML**, **CSS**, and **JavaScript**.  
Accessible, responsive, and beginner-friendly.


## Live Demo

See it live on GitHub Pages:  
[Student Finance Tracker Live](https://arianeitetero.github.io/StudentFinanceTracker_Summative/)

## Repository

Find all source files here:  
[Student Finance Tracker Repo](https://github.com/arianeitetero/StudentFinanceTracker_Summative)

## Demo Video

Watch a short walkthrough here:  
[Student Finance Tracker YouTube Demo](https://youtu.be/DiF2_o4mGPA)


## Chosen Theme

**Student Finance Tracker** – Manage your personal student finances, track transactions, and see spending trends.


## Spec & Wireframes (M1)

- **Wireframes/Sketches:** (Attach wireframe.png or describe your main layout and section flow)
- **Data Model:** Each transaction is an object:  
  `{ id, description, amount, category, date, createdAt, updatedAt }`
- **Accessibility Plan:** Semantic HTML, ARIA live regions, keyboard navigation, visible focus, skip link, heading hierarchy, proper labels.


## Features

- Add, edit, and delete transactions
- Dashboard with totals, top category, and last 7 days trend (accessible text, no charts)
- Sort by date, description, or amount
- Live regex search (safe compiler, accessible highlight)
- Data saved in LocalStorage (persists across sessions)
- Import/export JSON data (with structure validation)
- Settings for categories, currency, and cap
- Mobile-first responsive design (table/cards)
- All actions keyboard and screen reader accessible
- Error/status messages via ARIA live regions
- Tasteful UI animations and transitions


## Regex Catalog (M3)

| Field        | Pattern                                      | Example                  |
-----|
| Description  | `/^\S(?:.*\S)?$/`                            | "Lunch at cafeteria"     |
| Amount       | `/^(0|[1-9]\d*)(\.\d{1,2})?$/`               | "12.34", "0"             |
| Date         | `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | "2025-09-28"     |
| Category     | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/`            | "Food", "Entertainment"  |
| Advanced     | `/\b(\w+)\s+\1\b/` (duplicate words)         | "coffee coffee"          |

- **Date validation:** Also blocks dates before today.


## Keyboard Map

| Action                    | Key                     |
-|
| Move focus between fields | Tab / Shift + Tab       |
| Submit form               | Enter                   |
| Cancel edit               | Esc                     |
| Skip to main content      | Alt + S (or Tab to skip link) |
| Sort/select (where available) | Arrow keys          |


## Accessibility Notes (M1, M7)

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Proper heading hierarchy
- All inputs have labels bound via `for` and `id`
- Visible focus outlines for keyboard users
- Skip to content link for quick navigation
- ARIA live regions for error/status messages and dashboard updates
- Full keyboard navigation everywhere
- Color contrast meets WCAG AA/AAA


## How to Run the App Locally

> **Important:** Do **not** open `index.html` directly.  
> Use a local server for modules and data to work.

### Option 1 – Python
1. Open terminal in project folder  
2. Run:
    ```bash
    python -m http.server 8000
    ```
3. Open [http://localhost:8000/index.html](http://localhost:8000/index.html) in your browser

### Option 2 – VS Code Live Server
- Install the **Live Server** extension.
- Right-click `index.html` and choose **"Open with Live Server"**.


## How to Run Tests

- Open `tests.html` in your browser
- Input test values in the forms or test tables
- Green = pass, Red = fail
- No server is needed to run `tests.html`


## How to Import Seed Data

- Go to **Settings** in the app
- Click **Import JSON** and select `seed.json`
- Transactions will appear in the table/cards


## How to Use Features

- **Add/Edit:** Use the form, see errors if inputs are invalid
- **Regex Validation:** Try bad values (e.g. double spaces, invalid amount)
- **Regex Search:** Type patterns in the search box, see highlights
- **Sort:** Use sort buttons above transactions
- **Dashboard:** See stats update as you add/delete
- **Cap Logic:** Set a monthly cap in Settings, see status change
- **Settings:** Change categories/currency, update dropdown
- **Import/Export:** Use buttons in Transactions or Settings

## Wireframes

### Dashboard & Navigation
![](assets/wireframe.png)


## Contact

GitHub: [arianeitetero](https://github.com/arianeitetero)  
Email: a.itetero@alustudent.com