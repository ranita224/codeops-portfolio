# Ethiopia Weather App

A simple weather application built as part of the CodeOps Module 2 project.  
It allows users to search Ethiopian cities, view current conditions, save favourites, and subscribe for SMS weather alerts.

---

## Features
- City search: Filter weather cards by typing in the search bar.
- Weather cards: Each city shows temperature, condition, and a background image.
- Save favourites: Add or remove cities from your saved list (stored in localStorage).
- Subscription form: Users can subscribe with name, phone, and city. Includes validation for Ethiopian phone numbers.
- Responsive design: Works on desktop and mobile layouts.
- Error handling: Graceful messages for empty search, failed data load, or missing city data.

---

## Tech Stack
- HTML5 for structure
- CSS3 for styling and responsive layout
- JavaScript (ES6) for interactivity and state management
- JSON for city weather data
- LocalStorage for persistence

---

## Project Structure
day-24/
├── index.html        
├── app.js           
├── styles.css        
├── data/
│   └── weather.json  
└── images/   

---

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/ranita224/ethiopia-weather.git
2. Navigate into the project folder:
   cd Ethiopia-weather/day-25
3. Open index.html in your browser (or use a local server like VS Code Live Server).
Learning Outcomes: -

Practiced DOM manipulation and event handling.

Implemented state → render loop manually.

Used fetch to load JSON data.

Applied validation with regular expressions.

Improved code quality with refactor (constants, helper functions, guard clauses).

Polished with accessibility labels, error handling, and fallback images.
Next Steps: -
Add real weather API integration.

Extend subscription to send actual SMS alerts.

Transition to React to automate the state→render loop.

###Author
Built by Raniya Ayalew as part of CodeOps Module 2, Day 25 project.

