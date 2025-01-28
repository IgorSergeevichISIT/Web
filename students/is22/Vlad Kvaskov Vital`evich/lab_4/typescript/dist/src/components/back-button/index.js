export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }
    addListeners(listener) {
        var _a;
        (_a = document
            .getElementById("back-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", listener);
    }
    getHTML() {
        return `
            <button id="back-button" class="btn btn-primary" type="button">Назад</button>
        `;
    }
    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
