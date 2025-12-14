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

document.addEventListener('DOMContentLoaded', async function() {
    console.log("Приложение запускается...");
    
    const root = document.getElementById('root');

    const isConfigValid = await checkConfig();
    
    if (isConfigValid) {
        const mainPage = new MainPage(root);
        mainPage.render();
    }
});