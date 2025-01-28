import express from 'express';
import { ajax } from './modules/ajax.js';
import { urls } from './modules/urls.js'; 
import fs from 'fs/promises';

const app = express();
const jsonFilePath = './chat.json';
const port = 8000;
const BASE_URL = `http://localhost:${port}`;

app.use((req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
    console.log(log);
    
    next();
});

app.get('/getConversations/:groupId', async (req, res) => {
    try {
        const groupId = req.params.groupId;

        const data = await ajax.get(urls.getConversations(groupId));

        await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');

        res.send(data);
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        res.status(500).send({ message: 'Ошибка при получении данных о чатах', error: error.message });
    }
});


app.get('/getConversationsById/:peerId/:groupId', async (req, res) => {
    try {
        const peerId = req.params.peerId;
        const groupId = req.params.groupId;

        const response = await ajax.get(urls.getConversationsById(peerId, groupId));

        res.json(response.response.items);  

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).send({ message: 'Ошибка при получении чата', error: error.message });
    }
});

app.post('/deleteConversation/:peerId/:groupId', async (req, res) => {
    try {
        const { peerId, groupId } = req.params;

        if (!peerId || !groupId) {
            return res.status(400).send({ message: 'Неверные параметры запроса' });
        }

        const url = urls.deleteConversation(peerId, groupId);

        const response = await ajax.post(url);

        if (response.error) {
            console.error("Ошибка API:", response.error);
            return res.status(500).send({ message: 'Ошибка API', error: response.error });
        }

        console.log('Удаление завершено:', response);
        res.send({ message: 'Все сообщения успешно удалены', result: response });
    } catch (error) {
        console.error("Ошибка при удалении всех сообщений:", error);
        res.status(500).send({ message: 'Ошибка при удалении всех сообщений', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

