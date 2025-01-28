const express = require('express');

const dogs = require('./internal/dogs');

const app = express();

const host = 'localhost';
const port = 8000;

app.use(express.json());

app.use('/dogs', dogs);

app.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});
