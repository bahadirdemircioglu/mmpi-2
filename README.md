# mmpi-2

This repository contains a minimal web-based demo for presenting MMPI-2 style questions and calculating simple category scores.

## Running the demo

```sh
node server/index.js
```

Then open [http://localhost:3000](http://localhost:3000) in a browser.

## Converting from Excel

If you have an Excel file of questions (columns: `ID`, `Question`, `Category`), place it at `data/questions.xlsx` and run:

```sh
node scripts/convert.js
```

This requires the optional `xlsx` package to be installed. The script will output `data/questions.json` used by the server.

## Disclaimer

This project is for demonstration purposes only and does not replace professional psychological evaluation.
