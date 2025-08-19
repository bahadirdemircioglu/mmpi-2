// This script converts an Excel file to JSON.
// Requires the 'xlsx' package (npm install xlsx).

const fs = require('fs');
const xlsx = require('xlsx');

const workbook = xlsx.readFile(process.argv[2] || 'data/questions.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);
const formatted = rows.map((row, idx) => ({
  id: row.ID || idx + 1,
  text: row.Question,
  category: row.Category
}));
fs.writeFileSync('data/questions.json', JSON.stringify(formatted, null, 2));
console.log('Saved to data/questions.json');
