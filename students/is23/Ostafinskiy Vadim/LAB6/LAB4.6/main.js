import { MainPage } from "./pages/main/index.js";

async function checkConfig() {
    try {
        const module = await import("./modules/consts.js");
        
        if (module.groupId === 'ВАШ_ID_ГРУППЫ' || module.accessToken === 'ВАШ_ACCESS_TOKEN') {
            showConfigError();
            return false;
        }
        
        return true;
    } catch (error) {
        showConfigError();
        return false;
    }
}

function showConfigError() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-danger">
                <h4>Не настроены константы VK API!</h4>
                <p>Перед запуском необходимо:</p>
                <ol>
                    <li>Открыть файл <code>modules/consts.js</code></li>
                    <li>Заменить <code>ВАШ_ID_ГРУППЫ</code> на ID вашей группы VK</li>
                    <li>Заменить <code>ВАШ_ACCESS_TOKEN</code> на ваш токен доступа</li>
                    <li>Сохранить файл и обновить страницу</li>
                </ol>
                <p><strong>Как получить доступ:</strong></p>
                <ul>
                    <li>Создайте сообщество в VK</li>
                    <li>В настройках сообщества найдите "Работа с API"</li>
                    <li>Создайте ключ доступа с правами</li>
                </ul>
            </div>
        </div>
    `;
}

window.vkUsersAPI = {
    async getAllUsers(sort = '') {
        try {
            const url = sort ? `http://localhost:8001/users?sort=${sort}` : 'http://localhost:8001/users';
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    },

    async getUserById(id) {
        try {
            const response = await fetch(`http://localhost:8001/users/${id}`);
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
            return { error: error.message };
        }
    },

    async addUser(userData) {
        try {
            const response = await fetch('http://localhost:8001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ошибка добавления');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    },

    async deleteUser(id) {
        try {
            const response = await fetch(`http://localhost:8001/users/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ошибка удаления');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    }
};

document.addEventListener('DOMContentLoaded', async function() {
    console.log("Приложение запускается...");
    
    const root = document.getElementById('root');
    
    const isConfigValid = await checkConfig();
    
    if (isConfigValid) {
        const mainPage = new MainPage(root);
        mainPage.render();
    }
});