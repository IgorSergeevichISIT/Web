const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Используем твои реальные данные
const groupId = '234340351';
const accessToken = 'vk1.a.CGPI-Q2WGqO1c0FCha-MJbIwva-M9rzR9IFFnA89PLSPGwSfeeMrFaYHSPh2WbT_UraqELQ5hzPCAxvfJuqDl34H_5LY1qI0AjN7aDECGfoe7jEnEv-jLNkDPyoIbgAHdew8nZJoBzT691ep-deKFuGij9nO9fnyzzFmUXu8ZqR_09SrzJvYYl8q9OX79A9BvvcdSyLcJWSqAvnMwjThuQ';
const version = '5.131';

async function fetchVKUsers() {
    console.log('Запрашиваю данные из реального VK API...');
    console.log(`Группа: ${groupId}`);
    
    try {
        // Получаем участников группы
        const response = await axios.get('https://api.vk.com/method/groups.getMembers', {
            params: {
                group_id: groupId,
                fields: 'photo_200,photo_100',
                access_token: accessToken,
                v: version
            }
        });
        
        console.log('Ответ VK API:', response.data);
        
        if (response.data.error) {
            console.error('Ошибка VK API:', response.data.error);
            return [];
        }
        
        if (!response.data.response || !response.data.response.items) {
            console.error('Неверный формат ответа');
            return [];
        }
        
        const items = response.data.response.items;
        console.log(`Получено ${items.length} пользователей из VK`);
        
        // Для каждого пользователя получаем дополнительную информацию
        const users = await Promise.all(
            items.slice(0, 10).map(async (user) => { // Берем только первых 10 чтобы не перегружать API
                try {
                    const userResponse = await axios.get('https://api.vk.com/method/users.get', {
                        params: {
                            user_ids: user.id,
                            fields: 'photo_200,photo_100,city,bdate,is_closed,can_access_closed',
                            access_token: accessToken,
                            v: version
                        }
                    });
                    
                    if (userResponse.data.response && userResponse.data.response[0]) {
                        return userResponse.data.response[0];
                    }
                    return user;
                } catch (error) {
                    console.error(`Ошибка получения данных пользователя ${user.id}:`, error.message);
                    return user;
                }
            })
        );
        
        // Фильтруем null значения
        const validUsers = users.filter(user => user !== null);
        
        console.log(`Обработано ${validUsers.length} пользователей`);
        
        // Сохраняем в файл
        const filePath = path.join(__dirname, 'db', 'users.json');
        fs.writeFileSync(filePath, JSON.stringify(validUsers, null, 2));
        console.log(`Данные сохранены в ${filePath}`);
        
        return validUsers;
    } catch (error) {
        console.error('Ошибка при запросе к VK API:', error.message);
        
        // Если API не доступен, создаем тестовые данные
        console.log('Создаю тестовые данные...');
        const testUsers = [
            {
                "id": 286394954,
                "first_name": "Denis",
                "last_name": "Nikulshin",
                "photo_200": "https://sun145-2.userapi.com/impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200",
                "photo_100": "https://sun145-2.userapi.com/impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=100x100",
                "is_closed": true,
                "can_access_closed": true
            },
            {
                "id": 383119400,
                "first_name": "Полина",
                "last_name": "Соболева",
                "photo_200": "https://sun145-1.userapi.com/s/v1/ig2/A9uUr6LfywVR17PTGM_e_OBYS03iUR4EYKwnh2TL_-mpf3QJAtur7boVdG07zOwVkvvEo5jsSGu-QeSfmFLga1fA.jpg?quality=95&crop=1,190,1919,1919&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=200x200",
                "photo_100": "https://sun145-1.userapi.com/s/v1/ig2/A9uUr6LfywVR17PTGM_e_OBYS03iUR4EYKwnh2TL_-mpf3QJAtur7boVdG07zOwVkvvEo5jsSGu-QeSfmFLga1fA.jpg?quality=95&crop=1,190,1919,1919&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100",
                "is_closed": false,
                "can_access_closed": true
            },
            {
                "id": 470545939,
                "first_name": "Ирина",
                "last_name": "Янко",
                "photo_200": "https://sun145-2.userapi.com/s/v1/ig2/hMTDi9nizkvKDsKMVk8PPCXtuI04RCu7n4LMDKkQex_rIctZ7ho1xYO_c8gt_ocYVJfQmN0Bf_LgnnufgtgQYeuL.jpg?quality=95&crop=5,14,619,619&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=200x200",
                "photo_100": "https://sun145-2.userapi.com/s/v1/ig2/hMTDi9nizkvKDsKMVk8PPCXtuI04RCu7n4LMDKkQex_rIctZ7ho1xYO_c8gt_ocYVJfQmN0Bf_LgnnufgtgQYeuL.jpg?quality=95&crop=5,14,619,619&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540&ava=1&cs=100x100",
                "is_closed": false,
                "can_access_closed": true
            },
            {
                "id": 497680045,
                "first_name": "Вадим",
                "last_name": "Остафинский",
                "photo_200": "https://sun145-1.userapi.com/s/v1/ig2/aGSkikOlqOzgmICwmin2DNC0vAnEwO2w85k-ePIVaIa-KmnbU3_8o3xU_uV_upuEqzM7aLJ0hj0w8q8ncfXaflhZ.jpg?quality=95&crop=311,204,420,420&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=200x200",
                "photo_100": "https://sun145-1.userapi.com/s/v1/ig2/aGSkikOlqOzgmICwmin2DNC0vAnEwO2w85k-ePIVaIa-KmnbU3_8o3xU_uV_upuEqzM7aLJ0hj0w8q8ncfXaflhZ.jpg?quality=95&crop=311,204,420,420&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&ava=1&cs=100x100",
                "is_closed": true,
                "can_access_closed": true
            },
            {
                "id": 714635406,
                "first_name": "Екатерина",
                "last_name": "Тихомирова",
                "photo_200": "https://sun145-2.userapi.com/s/v1/ig2/Yq9EIs728Gsivw5yyiIO3gAbL9TsjTLGI1CL4AclrG0kPpoiCNIEIbguWBjaRREeChbfL9GOSKGzdwzk5DhEE6xm.jpg?quality=95&crop=1,47,1919,1919&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=200x200",
                "photo_100": "https://sun145-2.userapi.com/s/v1/ig2/Yq9EIs728Gsivw5yyiIO3gAbL9TsjTLGI1CL4AclrG0kPpoiCNIEIbguWBjaRREeChbfL9GOSKGzdwzk5DhEE6xm.jpg?quality=95&crop=1,47,1919,1919&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&cs=100x100",
                "is_closed": true,
                "can_access_closed": true
            }
        ];
        
        const filePath = path.join(__dirname, 'db', 'users.json');
        fs.writeFileSync(filePath, JSON.stringify(testUsers, null, 2));
        console.log(`💾 Тестовые данные сохранены в ${filePath}`);
        
        return testUsers;
    }
}

// Запускаем
fetchVKUsers();