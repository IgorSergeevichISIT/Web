/**
 * Компонент BackButton - для кнопки возврата на главную страницу
 */
export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * Генерирует HTML для кнопки возврата
     * @returns {string} HTML кнопки
     */
    getHTML() {
        return `
            <button id="back-button" class="btn btn-secondary mb-4" type="button">
                ← Назад на главную
            </button>
        `;
    }

    /**
     * Добавляет обработчик события клика на кнопку
     * @param {Function} listener - функция-обработчик клика
     */
    addListeners(listener) {
        document
            .getElementById('back-button')
            .addEventListener('click', listener);
    }

    /**
     * Отрисовывает кнопку возврата
     * @param {Function} listener - функция-обработчик клика
     */
    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
