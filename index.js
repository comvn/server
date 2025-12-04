require("dotenv").config();
const express = require("express");

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');




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
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  res.json({ message: data });
});

app.post("/", (req, res) => {
  res.json({ message: "Post OK" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});