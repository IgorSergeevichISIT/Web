import { ProductCardComponent } from "../../components/product-card/index.js"; // Импортируем компонент карточки
import { ProductPage } from "../product/index.js"; // Подключаем страницу продукта

export class MainPage {
    constructor(parent) {
        this.parent = parent; // Родительский элемент
    }

    get pageRoot() {
        return document.getElementById('main-page'); // Получаем элемент, в который будем добавлять карточки
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap"></div> <!-- Родитель для всех карточек -->
        `;
    }

    // Функция для получения тестовых данных
    getData() {
        return [
            { id: 1, src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", title: "Акция", text: "Такой акции вы еще не видели 1" },
            { id: 2, src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", title: "Акция", text: "Такой акции вы еще не видели 2" },
            { id: 3, src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg", title: "Акция", text: "Такой акции вы еще не видели 3" },
        ];
    }

    // Обработчик клика по карточке
    clickCard(e) {
        const cardId = e.target.dataset.id; // Получаем ID карточки через data-id
        console.log(`Перехожу на страницу продукта с ID: ${cardId}`);

        // Переходим на страницу продукта
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    // Метод рендеринга главной страницы
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}