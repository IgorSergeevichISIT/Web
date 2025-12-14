const express = require('express');
const cors = require('cors');
const dogsRouter = require('./internal/dogs');

const app = express();
const host = 'localhost';
const port = 8000;

app.use(cors()); 
app.use(express.json()); 

app.use('/dogs', dogsRouter);

app.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
    console.log('API доступно по адресам:');
    console.log('  GET    /dogs      - все породы собак');
    console.log('  GET    /dogs/:id  - конкретная порода');
    console.log('  POST   /dogs      - добавить породу');
    console.log('  DELETE /dogs/:id  - удалить породу');
});