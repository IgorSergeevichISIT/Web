import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());


app.get('/proxy', async (req, res) => {
    const url = req.query.url; 

    if (!url) {
        return res.status(400).send('URL не указан'); 
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Custom-Header': req.headers['x-custom-header'] 
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).send('Ошибка при получении данных');
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});