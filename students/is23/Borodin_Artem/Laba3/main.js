// Импортируем главную страницу
import { MainPage } from './pages/main/index.js';


const root = document.getElementById('root');

const mainPage = new MainPage(root);

// Обработчик для кнопки "Домой" в навигации
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault(); 
    mainPage.render(); 
});

mainPage.render();
