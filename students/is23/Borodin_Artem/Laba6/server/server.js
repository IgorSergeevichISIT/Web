const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3000;
const HOST = 'localhost';

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'users.json');

const VK_API_VERSION = '5.131';
const GROUP_ID = '234210160';
const ACCESS_TOKEN = 'vk1.a.91fHqyowHxGS2W8NsvNYnkI_q6pP00GPsJ17nKKqIqB4ase97YXqDesbBctZXsD1vQX-2m_Iq4xoGztuDTvqVRH8cWaiZz1j6IzsQFQasZv3JWT6Mlr7j2OypuBgVv7b79-3wZIFmGIDcHtNDoOhvdPYwIPauQLJRXySFmdZ6L-BQwo9bvTeq0jqle6Nmy5U4P5AyKhtjIX6SqGrYE8GPQ';

function readUsers() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Ошибка при записи файла:', error);
    return false;
  }
}

function generateNewId(users) {
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map(u => u.id));
  return maxId + 1;
}

function fetchVKGroupMembers() {
  return new Promise((resolve, reject) => {
    const url = `https://api.vk.com/method/groups.getMembers?group_id=${GROUP_ID}&access_token=${ACCESS_TOKEN}&v=${VK_API_VERSION}&fields=photo_200_orig,photo_100,photo_50,status,bdate,city`;


    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error('❌ Ошибка VK API:', response.error);
            resolve([]);
            return;
          }

          const members = response.response.items || [];
          console.log(`✅ Получено ${members.length} участников из VK`);

          resolve(members);
        } catch (err) {
          console.error('Ошибка парсинга:', err);
          resolve([]);
        }
      });
    }).on('error', (err) => {
      console.error('❌ Ошибка подключения к VK:', err);
      resolve([]);
    });
  });
}

function formatVKUser(vkUser, id) {
  let photoUrl = vkUser.photo_200_orig || vkUser.photo_100 || vkUser.photo_50 || null;
  
  return {
    id: id,
    first_name: vkUser.first_name || '',
    last_name: vkUser.last_name || '',
    photo_200_orig: photoUrl, 
    photo_100: photoUrl || 'https://i.pravatar.cc/100',
    photo_50: photoUrl || 'https://i.pravatar.cc/50',
    status: vkUser.status || 'all',
    bdate: vkUser.bdate || null,
    city: vkUser.city || null,
    about: ''
  };
}

async function initializeUsers() {
  console.log('\n📡 Загружаю данные из VK...');

  const vkMembers = await fetchVKGroupMembers();

  if (vkMembers.length > 0) {
    const limitedMembers = vkMembers.slice(0, 10);
    
    const formattedUsers = limitedMembers.map((vkUser, index) => {
      return formatVKUser(vkUser, index + 1);
    });

    writeUsers(formattedUsers);
    console.log(`✅ Сохранено ${formattedUsers.length} пользователей в users.json`);
  } else {
    console.log('⚠️ Не удалось получить данные из VK, используются локальные пользователи');
  }
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Сервер работает!' });
});

app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    const filter = req.query.filter || 'all';

    let filteredUsers = users;
    if (filter !== 'all' && users?.status) {
      filteredUsers = users.filter(user => user.status === filter);
    }

    res.status(200).json({
      response: {
        items: filteredUsers,
        count: filteredUsers.length
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении пользователей',
      error: error.message
    });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID должен быть числом'
      });
    }

    const users = readUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `Пользователь с ID ${userId} не найден`
      });
    }

    res.status(200).json({
      response: [user]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при получении пользователя',
      error: error.message
    });
  }
});

app.post('/api/users', (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({
        status: 'error',
        message: 'Требуются поля: first_name и last_name'
      });
    }

    const users = readUsers();
    const newUser = {
      id: generateNewId(users),
      first_name,
      last_name,
      photo_200_orig: req.body.photo_200_orig || 'https://i.pravatar.cc/200',
      photo_100: req.body.photo_100 || 'https://i.pravatar.cc/100',
      status: req.body.status || 'all',
      bdate: req.body.bdate || null,
      city: req.body.city || null,
      about: req.body.about || '',
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
      status: 'success',
      message: 'Пользователь добавлен',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при добавлении пользователя',
      error: error.message
    });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID должен быть числом'
      });
    }

    let users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: `Пользователь с ID ${userId} не найден`
      });
    }

    const deletedUser = users[userIndex];
    users = users.filter(u => u.id !== userId);
    writeUsers(users);

    res.status(200).json({
      status: 'success',
      message: 'Пользователь удалён',
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при удалении пользователя',
      error: error.message
    });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID должен быть числом'
      });
    }

    let users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: `Пользователь с ID ${userId} не найден`
      });
    }

    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      id: userId
    };

    writeUsers(users);

    res.status(200).json({
      status: 'success',
      message: 'Пользователь обновлён',
      user: users[userIndex]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Ошибка при обновлении пользователя',
      error: error.message
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Маршрут ${req.method} ${req.path} не найден`
  });
});

app.listen(PORT, HOST, async () => {
  console.log(`\n🚀 Сервер запущен по адресу http://${HOST}:${PORT}`);
  console.log(`📝 API документация:\n`);
  console.log(`  GET  /api/health              - проверка статуса`);
  console.log(`  GET  /api/users               - получить всех пользователей`);
  console.log(`  GET  /api/users/:id           - получить одного пользователя`);
  console.log(`  POST /api/users               - добавить нового пользователя`);
  console.log(`  PUT  /api/users/:id           - обновить пользователя`);
  console.log(`  DELETE /api/users/:id         - удалить пользователя\n`);

  await initializeUsers();
});
