import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { query } from './modules/DBConnector.js';
import { groupId, accessToken, version } from './modules/consts.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/members', async (req, res) => {
    try {
        console.log(`Запрос к VK API для группы ID: ${groupId}`);

        const response = await fetch(
            `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&fields=first_name,last_name&access_token=${accessToken}&v=${version}`
        );

        const data = await response.json();
        if (data.error) {
            console.error('Ошибка VK API:', data.error);
            return res.status(500).send({ error: `VK API Error: ${data.error.error_msg}` });
        }

        const members = data.response.items;
        console.log('Полученные участники:', members);

        for (const member of members) {
            const vk_id = member.id;
            const first_name = member.first_name || null;
            const last_name = member.last_name || null;

            console.log(`Добавление участника: vk_id=${vk_id}, first_name=${first_name}, last_name=${last_name}`);

            await query(
                `INSERT INTO members (vk_id, first_name, last_name) VALUES ($1, $2, $3) 
                 ON CONFLICT (vk_id) DO UPDATE 
                 SET first_name = EXCLUDED.first_name, 
                     last_name = EXCLUDED.last_name`,
                [vk_id, first_name, last_name]
            );
        }

        res.send({ message: 'Данные сохранены в БД', members });
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).send({ error: 'Ошибка при получении данных' });
    }
});

app.get('/api/members-db', async (req, res) => {
    try {
        const members = await query('SELECT * FROM members');
        res.send(members);
    } catch (error) {
        console.error('Ошибка при получении данных из БД:', error);
        res.status(500).send({ error: 'Ошибка при получении данных из БД' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
