import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";

// Класс страницы с информацией о пользователе
export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;  // Родительский элемент для рендеринга
        this.id = id;  // ID выбранного пользователя
    }

    async getData() { //
        ajax.get(`/user/${this.id}`, (data) => {
            this.renderData(data.response);
        });
    }

    // Метод для получения ссылки на контейнер страницы
    get pageRoot() {
        return document.getElementById('product-page');
    }

    // Шаблон HTML для страницы пользователя
    getHTML() {
        return `
            <div id="product-page">
                <!-- Сюда будет вставляться информация о пользователе -->
            </div>
        `;
    }

    // Метод для рендера данных о пользователе
    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item[0]); // Отображаем первого пользователя (так как в ответе массив)
    }

    // Метод для обработки кнопки "Назад"
    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();  // Перезагружаем главную страницу
    }

    // Метод рендеринга страницы
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем кнопку "Назад"
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        // Получаем данные о пользователе
        this.getData();
    }
}
