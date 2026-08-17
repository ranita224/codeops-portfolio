# Birr Watch

Birr Watch is a simple **data‑driven JavaScript app** that converts Ethiopian Birr (ETB) into other currencies using live exchange rates.  
It demonstrates the principles of a single source of truth, data fetching, rendering, user interaction, and persistence.

---

## Features
- **Live exchange rates** fetched from [open.er-api.com](https://open.er-api.com/v6/latest/ETB).
- **Conversion form**: enter an amount in ETB and select a currency.
- **Automatic watchlist**: every conversion adds the selected currency to your watchlist.
- **Watchlist management**: remove currencies with one click.
- **Persistence**: watchlist and last selected currency are saved in `localStorage` and restored on reload.
- **Validation & error handling**:
  - Rejects invalid or empty amounts.
  - Shows loading and error messages while fetching rates.
  - Handles corrupted saved data gracefully.

---

## Tech Stack
- **HTML** → app structure
- **CSS** → styling and layout
- **JavaScript (ES6)** → logic, fetch API, DOM manipulation, localStorage

---

## Project Structure
day-22/
│── index.html   # App skeleton
│── styles.css   # Styling
│── app.js       # All logic
│── README.md    # Documentation

---

## How to Run
1. Clone or download the project folder.
2. Open `index.html` in your browser.
3. The app will:
   - Show a loading message.
   - Fetch live ETB exchange rates.
   - Populate the dropdown with currency codes.
4. Enter an amount and click **Convert**:
   - The result will display.
   - The currency will be added to your watchlist automatically.
5. Remove currencies from the watchlist using the **delete** button.

---

## Assignment Conditions Fulfilled
- **Single source of truth** → `state` object in `app.js`.
- **Fetch live data** → `loadRates()` with `async/await`.
- **Render loop** → `render()` updates dropdown and watchlist from `state`.
- **User interaction** → conversion form + watchlist add/remove.
- **Persistence** → `localStorage` saves and reloads watchlist.
- **Validation** → regex + numeric checks for input.
- **Error handling** → loading/error messages in `#status`.

---

## API Reference
- Endpoint: `https://open.er-api.com/v6/latest/ETB`
- Returns JSON with exchange rates keyed by currency code:
```json
{
  "result": "success",
  "base_code": "ETB",
  "rates": {
    "USD": 0.0177,
    "EUR": 0.0164,
    "GBP": 0.0139,
    "KES": 2.29
  }
}

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ranita24
/birr-watch.git
2. Navigate into the project folder:
    cd birr-watch
3. Open index.html in your browser.

##Testing

-Enter valid and invalid amounts to confirm validation.

-Disconnect internet to confirm error handling.

-Add/remove currencies to confirm watchlist persistence.

-Reload the page to confirm localStorage restores the watchlist.

##Author
Developed by [Raniya ayalew ]
Course: CodeOps M2 D22 — JavaScript Project: Data Driven App