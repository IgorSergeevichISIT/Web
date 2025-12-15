// backend/server.js
const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 8000;
const HOST = 'localhost';

app.use(cors({
  origin: 'http://localhost:3000', // '*'
  credentials: false
}));

app.use(express.json()); // JSON

// routes
const usersRouter = require('./internal/users');
app.use('/users', usersRouter);

app.listen(PORT, HOST, () => {
  console.log(`Бэкенд запущен: http://${HOST}:${PORT}`);
});