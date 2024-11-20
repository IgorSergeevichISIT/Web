// Импортируем класс MainPage
import { MainPage } from "./pages/main/index.js";

// Получаем корневой элемент страницы (например, div с id="root")
const root = document.getElementById('root');

// Создаем экземпляр страницы, передаем root элемент
const mainPage = new MainPage(root);

// Рендерим страницу
mainPage.render();
    