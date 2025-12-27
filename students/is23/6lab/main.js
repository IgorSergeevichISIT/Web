import { MainPage } from "./components/pages/main-page.js";

const root = document.getElementById("root");
const mainPage = new MainPage(root);


mainPage.render().catch(error => {
    console.error('Ошибка при запуске приложения:', error);
    root.innerHTML = `
        <div class="alert alert-danger m-4">
            <h4>Ошибка загрузки</h4>
            <p>Не удалось загрузить галерею. Проверьте:</p>
            <ul>
                <li>Запущен ли сервер (node index.js)</li>
                <li>Доступность сервера по адресу: http://localhost:8000</li>
                <li>Консоль браузера на наличие ошибок CORS</li>
            </ul>
            <p>Детали ошибки: ${error.message}</p>
        </div>
    `;
});