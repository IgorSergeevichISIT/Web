const express = require('express');
const cors = require('cors');
const usersRouter = require('./internal/users');

const app = express();
const host = 'localhost';
const port = 8001;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.listen(port, host, () => {
    console.log(`Сервер VK Users API запущен по адресу http://${host}:${port}`);
    console.log('API доступно по адресам:');
    console.log('  GET    /users            - все пользователи (VK + добавленные)');
    console.log('  GET    /users/vk         - только пользователи VK');
    console.log('  GET    /users/custom     - только добавленные пользователи');
    console.log('  GET    /users/:id        - конкретный пользователь');
    console.log('  POST   /users            - добавить пользователя');
    console.log('  DELETE /users/:id        - удалить добавленного пользователя');
});