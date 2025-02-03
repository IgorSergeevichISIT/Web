import express from 'express';
import { ajax } from './modules/ajax.js';
import { urls } from './modules/urls.js';
import fs from 'fs/promises';  // Используем промисы для работы с файловой системой

const app = express();
const port = urls.getLocalServer()[1];
const jsonFilePath = './groupMembers.json';  
const deletedUsersFilePath = './deletedUsers.json';  // Путь к файлу для сохранения удаленных пользователей


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
        const { groupId } = req.params;
        const { sort } = req.query;
        const response = await ajax.post(urls.getGroupMembers(groupId, sort));
        let data = await response.json();

        var next_id = 0;
        for (var item of data.response.items) {
            item.id_inside = next_id;
            next_id += 1;
        }
        // Обновляем файл с данными группы
        await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');

        await fs.writeFile(deletedUsersFilePath, JSON.stringify([], null, 2), 'utf8');

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
            // Получаем удаленного пользователя
            const deletedUser = jsonData.response.items[userIndex];

            // Сохраняем удаленного пользователя в отдельный файл
            let deletedUsersData = [];

            // Если файл существует, считываем данные из него
            try {
                const deletedData = await fs.readFile(deletedUsersFilePath, 'utf8');
                deletedUsersData = JSON.parse(deletedData);
            } catch (err) {
                // Если файл не существует (например, в первый раз), пропускаем ошибку
            }

            // Добавляем удаленного пользователя в массив
            deletedUsersData.push(deletedUser);

            // Записываем данные о удаленных пользователях в отдельный файл
            await fs.writeFile(deletedUsersFilePath, JSON.stringify(deletedUsersData, null, 2), 'utf8');

            // Удаляем элемент из основного массива
            jsonData.response.items.splice(userIndex, 1);

            // Запись только изменённой части данных в основной файл
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

app.post('/return_user/:userid', async (req, res) => {
    try {
        const { userid } = req.params;

        let deletedUsersData = [];
        
        const deletedData = await fs.readFile(deletedUsersFilePath, 'utf8');
        deletedUsersData = JSON.parse(deletedData);

        // Находим пользователя по ID в списке удаленных пользователей
        const userIndex = deletedUsersData.findIndex(user => user.id === parseInt(userid));

        if (userIndex !== -1) {
            // Получаем удаленного пользователя
            const returnedUser = deletedUsersData.splice(userIndex, 1)[0];

            let jsonData = [];
            
            try {
                const data = await fs.readFile(jsonFilePath, 'utf8');
                jsonData = await JSON.parse(data);
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    throw err;
                }
            }

            const wherePut = jsonData.response.items.findIndex(user => user.id_inside >= returnedUser.id_inside);
            if (wherePut !== -1) {
                // Вставляем пользователя на позицию перед wherePut
                jsonData.response.items.splice(wherePut, 0, returnedUser);
            } else {
                // Если не найдено подходящее место, добавляем пользователя в конец
                jsonData.response.items.unshift(returnedUser);
            }
         

            // Записываем обновленные данные в основной файл
            await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');

            // Записываем обновленные данные в файл с удаленными пользователями (удаляем возвращенного пользователя)
            await fs.writeFile(deletedUsersFilePath, JSON.stringify(deletedUsersData, null, 2), 'utf8');

            res.send({ message: 'Пользователь успешно возвращен', user: returnedUser });
        } else {
            res.status(404).send({ message: 'Пользователь не найден в списке удаленных' });
        }
    } catch (error) {
        console.error('Ошибка при возвращении пользователя:', error);
        res.status(500).send({ message: 'Ошибка при возвращении пользователя', error: error.message });
    }
});

app.get('/all_deleted_id', async (req, res) => {
    try {
        let deletedUsersData = [];

        // Чтение данных из файла
        try {
            const deletedData = await fs.readFile(deletedUsersFilePath, 'utf8');
            deletedUsersData = JSON.parse(deletedData);
        } catch (err) {
            if (err.code === 'ENOENT') {
                // Если файл не найден, просто возвращаем пустой массив
                return res.send([]);
            }
            throw err;  // Если ошибка другого типа, выбрасываем ее
        }

        // Извлекаем все id пользователей из массива
        const deletedUserIds = deletedUsersData.map(user => user.id);

        // Отправляем список всех удаленных id
        res.send(deletedUserIds);
    } catch (error) {
        console.error('Ошибка при получении удаленных пользователей:', error);
        res.status(500).send({ message: 'Ошибка при получении удаленных пользователей', error: error.message });
    }
});



// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на ${urls.getLocalServer()[0]}`);
});
