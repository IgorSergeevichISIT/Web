export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    // Добавляем обработчик на клик по кнопке
    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener);
    }

    // Возвращаем HTML для кнопки
    getHTML() {
        return `
            <button id="back-button" class="btn btn-primary" type="button">Назад</button>
        `;
    }

    // Рендерим кнопку и добавляем обработчик
    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}