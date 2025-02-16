import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = 3000;
const MIN_NUMBER = 0;

const romanNumerals = [
  { value: 1000000, symbol: "\u0305M" },
  { value: 900000, symbol: "\u0305CM" },
  { value: 500000, symbol: "\u0305D" },
  { value: 400000, symbol: "\u0305CD" },
  { value: 100000, symbol: "\u0305C" },
  { value: 90000, symbol: "\u0305XC" },
  { value: 50000, symbol: "\u0305L" },
  { value: 40000, symbol: "\u0305XL" },
  { value: 10000, symbol: "\u0305X" },
  { value: 9000, symbol: "\u0305IX" },
  { value: 5000, symbol: "\u0305V" },
  { value: 4000, symbol: "\u0305IV" },
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

function convertToRoman(num) {
  let result = "";
  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      result += numeral.symbol;
      num -= numeral.value;
    }
  }
  return result;
}

app.get("/convert-to-roman", (req, res) => {
  const number = parseInt(req.query.number);

  if (isNaN(number) || number <= MIN_NUMBER) {
    return res
      .status(400)
      .json({ error: "Please provide a valid number greater than 0" });
  }

  let romanNumeral = null;

  romanNumeral = convertToRoman(number);

  res.json({ number, romanNumeral });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
