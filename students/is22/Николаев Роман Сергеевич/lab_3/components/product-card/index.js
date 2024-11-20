export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent; // Родительский элемент
    }

    // Функция для генерации HTML-разметки карточки, принимает данные
    getHTML(data) {
        return `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary">Нажми на меня</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener); // Подписываемся на событие click
    }

    // Метод для рендеринга карточки, принимает данные
    render(data, listener) {
        const html = this.getHTML(data); // Генерируем HTML для карточки
        this.parent.insertAdjacentHTML('beforeend', html); // Вставляем карточку в родительский элемент
        this.addListeners(data, listener); // Подписываемся на событие клика
    }
}
