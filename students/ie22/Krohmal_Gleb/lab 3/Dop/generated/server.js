const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 3000;
const host = 'localhost';

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});