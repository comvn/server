require("dotenv").config();
const express = require("express");

const fs = require('fs');
const path = require('path');






const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(async (req, res, next) => {

  const userAgent = req.headers['user-agent'] || '';

  if (userAgent.toLowerCase().includes('cron-job.org')) {
    console.log('cron-job.org is working! Api alive.');
  }
  else {
    const logData = {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    };

    console.log(JSON.stringify(logData, null, 2));
  }
  next();
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, 'db.json');

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) return res.status(500).send('Error reading file');
    console.log(data);
    res.send(content);
  });
});

app.post("/", (req, res) => {
  res.json({ message: "Post OK" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});