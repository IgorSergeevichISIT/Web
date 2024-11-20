import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";  // Импортируем главную страницу
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id; // Получаем id страницы продукта
    }

    // Метод для получения данных продукта по id
    getData() {
        return {
            id: this.id,
            src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", // Здесь можно подставить другие изображения или данные
            title: `Акция ${this.id}`,
            text: `Такой акции вы еще не видели ${this.id}`,
        };
    }

    // Получаем элемент, в который будем вставлять HTML страницы
    get pageRoot() {
        return document.getElementById('product-page');
    }

    // HTML-шаблон для страницы
    getHTML() {
        return `
            <div id="product-page"></div>
        `;
    }

    // Обработчик кнопки "Назад"
    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render(); // Переходим обратно на главную страницу
    }

    // Метод рендеринга страницы продукта
    render() {
        // Очищаем родительский элемент и добавляем HTML страницы
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем кнопку "Назад"
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));  // Прокидываем обработчик
        
        // Получаем данные для продукта
        const data = this.getData();

        // Создаем и рендерим компонент с данными
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}