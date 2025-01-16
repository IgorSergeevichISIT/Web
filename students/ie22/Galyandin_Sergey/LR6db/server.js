const express = require('express');
const cors = require('cors')
const stocks = require('./internal/stocks');
const sequelize = require('./db/db.js')

const app = express();
app.use(cors())
const host = 'localhost';
const port = 8000;

app.use(express.json());

app.use('/stocks', stocks);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, host, () => {
            console.log(`Сервер запущен по адресу http://${host}:${port}`);
        });
        console.log(`Сервер запущен по адресу http://${host}:${port}`);
    } catch (e) {
        console.log(e)
    }
}

start()