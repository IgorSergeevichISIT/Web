import { ProductCardComponent } from "../../components/product-card/index.js"; // Импортируем компонент карточки

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
            {
                id: 1,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 1"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 2"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция",
                text: "Такой акции вы еще не видели 3"
            },
        ]
    }

    // clickCard(e) {
    //     const cardId = e.target.dataset.id; // Получаем ID карточки через data-id
    //     console.log(`Клик по карточке с ID: ${cardId}`); // Выводим ID в консоль
    // }

    // Метод для рендеринга страницы
    render() {
        this.parent.innerHTML = ''; // Очищаем родительский элемент
        const html = this.getHTML(); // Генерируем HTML для родительского контейнера
        this.parent.insertAdjacentHTML('beforeend', html); // Вставляем контейнер на страницу

        const data = this.getData(); // Получаем данные для карточек
        // data.forEach((item) => {
        //     const productCard = new ProductCardComponent(this.pageRoot); // Создаем компонент карточки
        //     productCard.render(item, this.clickCard.bind(this)); // Рендерим карточку с данными и передаем обработчик
        // });
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot); // Создаем компонент карточки
            productCard.render(item); // Рендерим карточку с данными
        });
    }
}