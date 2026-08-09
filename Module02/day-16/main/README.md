# Tip Calculator

A simple JavaScript program that calculates tips, service fees, and per‑person amounts.  
This project was built as part of learning JavaScript foundations.

# Features
- Reads a bill amount and party size
- Applies a tiered tip:
  - 10% if bill > 300 ETB
  - 5% otherwise
- Computes total amount including tip
- Splits the bill evenly per person
- Adds a service fee depending on payment method:
  - TeleBirr → 5 ETB
  - CBE Birr → 3 ETB
- Outputs results clearly using template literals

# How to Run
# Option 1: Node.js
1. Install [Node.js](https://nodejs.org) if not already installed.
2. Open terminal in your project folder.
3. Run:
   ```bash
   node tip.js
# Option 2: Browser
1. Open index.html in any browser.
2.Press F12 → go to the Console tab.
3.View the output.
# Example Output
Bill Amount: 1000.00 ETB
Tip Amount: 100.00 ETB
Total Amount (including tip): 1100.00 ETB
Each person pays: 220.00 ETB

# Files

>tip.js → main JavaScript logic

>index.html →
runs the script in a browser

>expected.txt → 
sample output for verification

>README.md → project documentation

# Save and preview
- Save the file (`Ctrl + S`).  
- In VS Code, right‑click the file → **Open Preview** to see the formatted Markdown.



# Commit and push
git add README.md
git commit -m "Add README documentation"
git push