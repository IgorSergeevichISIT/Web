const express = require('express');
const stocksRouter = require('./internal/stocks'); // Убедитесь, что путь правильный

const app = express();
const host = 'localhost';
const port = 8000;

app.use(express.json()); // Для парсинга JSON-данных
app.use('/stocks', stocksRouter); // Настройка маршрутов

// Запуск сервера
app.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});
