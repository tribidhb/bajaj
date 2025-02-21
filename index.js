const express = require("express");
const app = express();

app.use(express.json());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 101 });
  })
  .post((req, res) => {
    const inputData = req.body.data || [];
    const numericValues = [];
    const alphabeticValues = [];
    let topAlphabet = "";

    for (const element of inputData) {
      if (!isNaN(element)) {
        numericValues.push(element);
      } else if (element.length === 1 && isNaN(element)) {
        alphabeticValues.push(element);
        if (!topAlphabet || element.toUpperCase() > topAlphabet.toUpperCase()) {
          topAlphabet = element;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "tribidh_bhagat",
      email: "tribidh.bhagat@example.com",
      roll_number: "CU123456",
      numbers: numericValues,
      alphabets: alphabeticValues,
      highest_alphabet: topAlphabet ? [topAlphabet] : [],
    });
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Tribidh's Server is up at http://localhost:${port}`);
});