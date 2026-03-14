# FINSTORY - Interactive Financial Learning Simulator

## Overview
FINSTORY is a modern, visual financial education platform designed to help beginners intuitively understand key investing concepts. It features a suite of interactive simulators, including SIP calculations, compounding visualizers, and inflation impact tools, all presented in a sleek, fintech-style dashboard.

## Features
- **SIP Growth Simulator**: Visualizes the exponential growth of systematic monthly investments.
- **Lump Sum Growth Calculator**: Calculates the future value of one-time investments.
- **Start Early vs Start Late Simulator**: Compares two investors to showcase the importance of time in compounding.
- **Inflation Reality Check**: Demonstrates how inflation erodes purchasing power over time.
- **Financial Goal Planner**: Helps determine the required monthly SIP to reach a specific financial goal.
- **Investment Delay Impact**: Shows the exact cost of deferring investment decisions.
- **Compounding Visualizer**: Highlights the magic of the compound curve over long periods.
- **Education Hub**: Simple, jargon-free explanations of core financial terms.

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Library**: [Chart.js](https://www.chartjs.org/) for animations and data visualization
- **Architecture**: Modular, client-side only (No backend/database required)

## Installation & Usage Instructions
1. Clone or download this repository.
2. Open the `fincal-project` folder.
3. Double-click the `index.html` file to open it in any modern web browser.
4. No build steps or local servers are strictly required!

## System Requirements
- Any modern web browser (Google Chrome, Mozilla Firefox, Safari, Edge).
- Internet connection (to load Chart.js and Google Fonts from CDNs).

## Architecture Details
The project is built keeping minimalism and raw Web technologies in focus:
- `index.html` structure acts as a single-page dashboard.
- `style.css` handles the "glassmorphism", dark mode fintech themes, layout grids, and animations.
- `script.js` establishes the shared Chart options and global formatters.
- `calculators/*.js` keep logic decoupled. Each file computes mathematics and dynamically plots to its own Chart instance upon DOM update.

---
**EDUCATIONAL DISCLAIMER:** 
This application is strictly for educational purposes and is designed to improve financial literacy. It does **not** provide financial advice, recommend specific mutual funds or investment schemes, nor does it guarantee Returns. All calculations use fixed variables to illustrate mathematical concepts. Real-world returns fluctuate due to market risks. Please consult a registered financial advisor before making any real investment decisions.
