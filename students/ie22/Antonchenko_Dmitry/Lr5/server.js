const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let groupInfo = {
    id: '175393616',
    name: 'Пример группы'
};

let members = [
    { id: 1, first_name: 'Иван', last_name: 'Иванов', photo_200: 'https://via.placeholder.com/200' },
    { id: 2, first_name: 'Петр', last_name: 'Петров', photo_200: 'https://via.placeholder.com/200' }
];

// Получение информации о группе
app.get('/api/group', (req, res) => {
    res.json(groupInfo);
});

// Получение списка участников
app.get('/api/members', (req, res) => {
    res.json(members);
});

// Добавление нового участника
app.post('/api/members', (req, res) => {
    const newMember = req.body;
    newMember.id = members.length + 1;
    members.push(newMember);
    res.status(201).json(newMember);
});

// Удаление участника
app.delete('/api/members/:id', (req, res) => {
    const memberId = parseInt(req.params.id, 10);
    members = members.filter(member => member.id !== memberId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
