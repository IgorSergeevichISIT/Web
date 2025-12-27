import {IndexPage} from "./pages/index/index.js";
import {ProductPage} from "./pages/product/product.js";

class App {
    constructor() {
        console.log('Приложение запускается...');
        this.routes = [
            {path: "", page: IndexPage},
            {path: "product", page: ProductPage}
        ]
    }

    init() {
        console.log('Инициализация роутера...');
        
        // Обработчик изменения хэша
        window.addEventListener('hashchange', () => {
            console.log(' Хэш изменился:', window.location.hash);
            this.route();
        });
        
        // Обработчик нажатия кнопки "Назад" в браузере
        window.addEventListener('popstate', () => {
            console.log('Нажата кнопка "Назад"');
            this.route();
        });
        
        // Инициализация при загрузке
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('DOM загружен');
                this.route();
            });
        } else {
            console.log('DOM уже загружен');
            this.route();
        }
    }

    route() {
        // Получаем хэш без решётки
        const hash = window.location.hash.substring(1);
        console.log('Текущий хэш:', hash || '(главная страница)');
        
        // Разбиваем на части
        const parts = hash.split('/');
        const path = parts[0];
        const id = parts[1];
        
        console.log(`Разобранный путь: path="${path}", id="${id}"`);
        
        // Ищем подходящий роут
        const route = this.routes.find(r => r.path === path);
        
        if (!route) {
            console.log('Рендерим главную страницу (роут не найден)');
            this.renderPage(IndexPage);
            return;
        }
        
        console.log(`Рендерим страницу: ${path}${id ? ` с ID=${id}` : ''}`);
        const page = new route.page(document.getElementById('app'), id);
        page.render();
    }

    renderPage(PageClass) {
        const page = new PageClass(document.getElementById('app'));
        page.render();
    }
}

console.log('Загрузка приложения...');
const app = new App();
app.init();