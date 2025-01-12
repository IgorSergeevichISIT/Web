import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/members', async (req, res) => {
    try {
        const response = await fetch('https://api.vk.com/method/groups.getMembers?group_id=your_group_id&access_token=your_access_token&v=5.131');
        const data = await response.json();
        res.send(data.response.items);
    } catch (error) {
        res.status(500).send({ error: 'Ошибка при получении данных' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
