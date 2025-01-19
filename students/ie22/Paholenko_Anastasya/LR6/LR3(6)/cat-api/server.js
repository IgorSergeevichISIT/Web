const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let cats = [
    { id: 1, name: "Лизка", image: "images/cat1.jpg", description: "Дружелюбная и игривая кошечка." },
    { id: 2, name: "Лёля", image: "images/cat2.jpg", description: "Лёля с подружкой." },
    { id: 3, name: "Котя", image: "images/cat3.jpg", description: "У Коти 1000 ммр в доте2." },
    { id: 4, name: "Мявка", image: "images/cat4.jpg", description: "Любит показывать свои лапки." },
    { id: 5, name: "Рыська", image: "images/cat5.jpg", description: "Любит покушать." },
    { id: 6, name: "Маша", image: "images/cat6.jpg", description: "*подмигивает" },
    { id: 7, name: "Тамара", image: "images/cat7.jpg", description: "а она не любит фоткаться" }
];

// получить всех котов
app.get('/api/cats', (req, res) => {
    res.json(cats);
});

// добавить кота
app.post('/api/cats', (req, res) => {
    const newCat = { id: cats.length + 1, ...req.body };
    cats.push(newCat);
    res.status(201).json(newCat);
});

// удалить кота
app.delete('/api/cats/:id', (req, res) => {
    const { id } = req.params;
    cats = cats.filter(cat => cat.id !== parseInt(id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});