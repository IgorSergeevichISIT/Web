export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const backButton = document.getElementById("back-button");
        if (backButton) {
            backButton.addEventListener("click", listener);
        }
    }

    getHTML() {
        return `
            <button id="back-button" class="bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-300" type="button">Назад</button>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}