const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Serve static frontend files (if using React/Vue/Angular)
app.use(express.static(path.join(__dirname, "public")));

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully at https://bajaj-z9e1.onrender.com");
});

// Main API Endpoint
app.route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
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
      user_id: "tribidh_bhagat_21022025",
      email: "tribidh.bhagat@example.com",
      roll_number: "CU123456",
      numbers: numericValues,
      alphabets: alphabeticValues,
      highest_alphabet: topAlphabet ? [topAlphabet] : [],
      api_url: "https://bajaj-z9e1.onrender.com/bfhl"
    });
  });

// Handle 404 Errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found", api_url: "https://bajaj-z9e1.onrender.com" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at https://bajaj-z9e1.onrender.com`);
});
