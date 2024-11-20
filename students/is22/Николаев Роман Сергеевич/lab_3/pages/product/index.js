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

    // Генерируем HTML для страницы продукта
    getHTML() {
        const data = this.getData();
        return `
            <div id="product-page">
                <div class="card" style="width: 300px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button id="back-button" class="btn btn-secondary">Назад</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Метод рендеринга страницы продукта
    render() {
        this.parent.innerHTML = ''; // Очищаем родительский элемент
        const html = this.getHTML(); // Генерируем HTML для страницы продукта
        this.parent.insertAdjacentHTML('beforeend', html); // Вставляем HTML на страницу

        // Добавляем обработчик на кнопку "Назад"
        document.getElementById('back-button').addEventListener('click', () => {
            // Возвращаемся на главную страницу
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }
}