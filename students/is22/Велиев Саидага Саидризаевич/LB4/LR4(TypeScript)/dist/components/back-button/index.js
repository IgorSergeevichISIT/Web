export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }
    addListeners(listener) {
        document
            .getElementById('back-button')
            .addEventListener('click', listener);
    }
    getHTML() {
        return (`<button id="back-button" class="btn btn-primary" type="button">Назад</button>`);
    }
    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(listener);
    }
}
