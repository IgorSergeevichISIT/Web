/**
 * Компонент CatCard - для отображения карточки кошки
 * Используется Bootstrap Card компонент
 */
export class CatCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * Генерирует HTML для карточки кошки
     * @param {Object} data - данные кошки
     * @param {number} data.id - ID кошки
     * @param {string} data.name - имя кошки
     * @param {string} data.breed - порода кошки
     * @param {string} data.image - URL изображения кошки
     * @returns {string} HTML карточки
     */
    getHTML(data) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm" style="cursor: pointer;">
                    <img src="${data.image}" class="card-img-top" alt="${data.name}" style="height: 250px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text text-muted">${data.breed}</p>
                        <button class="btn btn-primary btn-sm" id="cat-button-${data.id}" data-id="${data.id}">
                            Подробнее
                        </button>
                        <button class="btn btn-danger btn-sm delete-button" id="delete-button-${data.id}" data-id="${data.id}">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Добавляет обработчик события клика на кнопку
     * @param {Object} data - данные кошки
     * @param {Function} detailListener - функция-обработчик клика "Подробнее"
     * @param {Function} deleteListener - функция-обработчик клика "Удалить"
     */
    addListeners(data, detailListener, deleteListener) {
        // Обработчик для кнопки "Подробнее"
        document
            .getElementById(`cat-button-${data.id}`)
            .addEventListener('click', detailListener);
            
        // Обработчик для кнопки "Удалить"
        document
            .getElementById(`delete-button-${data.id}`)
            .addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем срабатывание клика по карточке
                deleteListener(data.id);
            });
    }

    /**
     * Отрисовывает карточку кошки
     * @param {Object} data - данные кошки
     * @param {Function} detailListener - функция-обработчик клика "Подробнее"
     * @param {Function} deleteListener - функция-обработчик клика "Удалить"
     */
    render(data, detailListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, detailListener, deleteListener);
    }
}
