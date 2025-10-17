# Student Finance Tracker

A web app to help students track expenses, budgets, and spending trends.  
Built with **HTML**, **CSS**, and **JavaScript**.



## Live Demo

You can see the app live on GitHub Pages:  
[Student Finance Tracker Live](https://arianeitetero.github.io/StudentFinanceTracker_Summative/)

## Repository

All project files are available on GitHub:  
[Student Finance Tracker Repo](https://github.com/arianeitetero/StudentFinanceTracker_Summative)

## Demo Video

Watch a short demo of the app here:  
[Student Finance Tracker YouTube Demo](https://youtu.be/DiF2_o4mGPA)



## Chosen Theme

**Student Finance Tracker** – manage your personal student finances, track transactions, and see spending trends.



## Features

- Add, edit, and delete transactions  
- Dashboard with totals, top category, and last 7 days trend  
- Live search and sorting  
- Data saved in LocalStorage  
- Import/export JSON data  
- Settings for categories and currency  
- Mobile-first responsive design  
- Keyboard and screen reader accessible  



## Regex Catalog

| Field        | Pattern                                      | Example                  |
|--|-|--|
| Description  | `/^\S(?:.*\S)?$/`                            | "Lunch at cafeteria"     |
| Amount       | `/^(0|[1-9]\d*)(\.\d{1,2})?$/`              | "12.34", "0"             |
| Date         | `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | "2025-09-28"       |
| Category     | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/`           | "Food", "Entertainment"  |
| Advanced     | `/\b(\w+)\s+\1\b/` (duplicate words)        | "coffee coffee"          |



## Keyboard Map

| Action                    | Key                     |
|-||
| Move focus between fields  | Tab / Shift + Tab      |
| Submit form                | Enter                  |
| Cancel edit                | Esc                    |
| Skip to main content       | Alt + S                |
| Sort/select (where available) | Arrow keys           |



## Accessibility Notes

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`)  
- Proper heading hierarchy  
- All inputs have labels bound via `for` and `id`  
- Visible focus outlines for keyboard users  
- Skip to content link for quick navigation  
- ARIA live regions for error/status messages and dashboard updates  
- Works fully with keyboard navigation  
- Color contrast checked for WCAG AA/AAA  



## How to Run the App Locally

> **Important:** Do **not** open `index.html` directly. Use a local server.

### Option 1 – Python
1. Open terminal in project folder  
2. Run:
```bash
python -m http.server 8000
3. Open http://localhost:8000/index.html
 in your browser
 
How to Run Tests

Open tests.html in your browser

Input test values in the forms or test tables

Green = pass, Red = fail

No server is needed to run tests.html