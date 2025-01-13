import express from 'express';
import { ajax } from './modules/ajax.js';
import { urls } from './modules/urls.js';
import fs from 'fs/promises';  // Используем промисы для работы с файловой системой

const app = express();
const port = urls.getLocalServer()[1];
const jsonFilePath = './groupMembers.json';  

let isWriting = false;

app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await ajax.post(urls.getUserInfo(userId));
        res.send(await response.json());
    } catch (error) {
        res.status(500).send({ message: 'Ошибка при получении данных о пользователе', error: error.message });
    }
});

app.get('/new/group/:groupId/members', async (req, res) => {
    try {
        console.debug("started")
        const { groupId } = req.params;
        const { sort } = req.query;
        const response = await ajax.post(urls.getGroupMembers(groupId, sort));
        const data = await response.json();
        console.debug(data)
        
        // Обновляем файл
        await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Ошибка при получении участников группы', error: error.message });
    }
});

app.get('/groupINFO', async (req, res) => {
    try {
        // Чтение данных из файла
        const data = await fs.readFile(jsonFilePath, 'utf8');
        res.send(JSON.parse(data));
    } catch (error) {
        res.status(500).send({ message: 'Ошибка при чтении файла', error: error.message });
    }
});

// Обработчик для удаления пользователя
app.post('/delete_user/:userid', async (req, res) => {
    const { userid } = req.params;

    // Если запись в файл уже выполняется, игнорируем запрос
    if (isWriting) {
        return res.status(400).send('Запись в файл уже выполняется');
    }

    isWriting = true;

    try {
        // Чтение данных из файла
        const data = await fs.readFile(jsonFilePath, 'utf8');
        let jsonData = JSON.parse(data);

        // Фильтрация пользователей для удаления нужного по ID
        const userIndex = jsonData.response.items.findIndex(user => user.id === parseInt(userid));

        if (userIndex !== -1) {
            // Удаляем элемент по индексу
            jsonData.response.items.splice(userIndex, 1);

            // Запись только изменённой части данных в файл
            await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
            res.send('Пользователь удалён успешно');
        } else {
            res.status(404).send('Пользователь не найден');
        }
    } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
        res.status(500).send('Ошибка при удалении пользователя');
    } finally {
        isWriting = false;
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на ${urls.getLocalServer()[0]}`);
});
