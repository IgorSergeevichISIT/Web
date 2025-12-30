const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Путь к файлу с данными
const USERS_FILE = path.join(__dirname, 'db', 'users.json');

// Чтение пользователей
const readUsers = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения файла:', error);
        return [];
    }
};

// Запись пользователей
const writeUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Ошибка записи файла:', error);
        return false;
    }
};

// =============== VK API ЭМУЛЯЦИЯ ===============

// 1. groups.getMembers - ОСНОВНОЙ endpoint для фронтенда
app.get('/api/groups.getMembers', (req, res) => {
    console.log('GET /api/groups.getMembers');
    
    const filter = req.query.filter || 'all';
    let users = readUsers();
    
    // Применяем фильтры как в VK API
    if (filter === 'friends') {
        // Друзья - первые 3 пользователя
        users = users.slice(0, 3);
    } else if (filter === 'managers') {
        // Руководители - только создатель (Екатерина)
        users = users.filter(user => user.id === 714635406);
    }
    
    // Всегда возвращаем ВСЕХ пользователей, которые есть в базе
    console.log(`Возвращаю ${users.length} пользователей`);
    
    res.json({
        response: {
            count: users.length,
            items: users.map(user => ({
                ...user,
                photo_400_orig: user.photo_200
            })),
            next_from: ""
        }
    });
});

// 2. users.get - информация о пользователе
app.get('/api/users.get', (req, res) => {
    const userId = parseInt(req.query.user_ids);
    console.log(`GET /api/users.get?user_ids=${userId}`);
    
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.json({
            response: [{
                ...user,
                photo_400_orig: user.photo_200,
                city: { id: 1, title: "Москва" },
                bdate: "01.01.1990"
            }]
        });
    } else {
        res.status(404).json({
            error: {
                error_code: 404,
                error_msg: 'User not found'
            }
        });
    }
});

// =============== REST API ДЛЯ УПРАВЛЕНИЯ ===============

// 3. Добавить пользователя (POST)
app.post('/api/users', (req, res) => {
    console.log('POST /api/users', req.body);
    
    const newUser = req.body;
    
    if (!newUser.first_name || !newUser.last_name) {
        return res.status(400).json({
            error: { message: 'First name and last name are required' }
        });
    }
    
    const users = readUsers();
    
    // Генерируем ID
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    const newId = maxId + 1;
    
    const userToAdd = {
        id: newId,
        first_name: newUser.first_name.trim(),
        last_name: newUser.last_name.trim(),
        photo_200: newUser.photo_200 || "https://vk.com/images/camera_200.png",
        photo_100: newUser.photo_100 || "https://vk.com/images/camera_100.png",
        is_closed: newUser.is_closed || false,
        can_access_closed: newUser.can_access_closed || true
    };
    
    console.log('Добавляю пользователя:', userToAdd);
    
    users.push(userToAdd);
    
    if (!writeUsers(users)) {
        return res.status(500).json({
            error: { message: 'Failed to save user' }
        });
    }
    
    res.status(201).json({
        success: true,
        message: 'User added',
        user: userToAdd
    });
});

// 4. Удалить пользователя (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(`DELETE /api/users/${userId}`);
    
    let users = readUsers();
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== userId);
    
    if (users.length === initialLength) {
        return res.status(404).json({
            error: { message: 'User not found' }
        });
    }
    
    if (!writeUsers(users)) {
        return res.status(500).json({
            error: { message: 'Failed to delete user' }
        });
    }
    
    res.json({
        success: true,
        message: 'User deleted',
        count: users.length
    });
});

// Статические файлы фронтенда
app.use(express.static(path.join(__dirname, '../project')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../project/index.html'));
});

app.listen(PORT, () => {
    console.log(`\nСервер запущен: http://localhost:${PORT}`);
    console.log(`Фронтенд: http://localhost:${PORT}/`);
    console.log(`API: http://localhost:8000/api/groups.getMembers\n`);
});