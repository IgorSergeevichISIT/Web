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
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
        `;
    }

    addListeners(listener) {
        // Подписываемся на событие клика в родительском элементе
        this.parent.addEventListener('click', (e) => {
            // Проверяем, был ли клик по кнопке
            if (e.target && e.target.id.startsWith('click-card-')) {
                const cardId = e.target.dataset.id;
                listener(e); // Вызываем переданный обработчик
            }
        });
    }

    // Метод для рендеринга карточки, принимает данные
    render(data, listener) {
        const html = this.getHTML(data); // Генерируем HTML для карточки
        this.parent.insertAdjacentHTML('beforeend', html); // Вставляем карточку в родительский элемент
        this.addListeners(listener); // Подписываемся на событие клика
    }
}
