export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `       <div style="position: absolute; bottom: 21%; left: 50%; transform: translateX(-50%);">
                        <button id="back-button" class="btn btn-primary" type="button">Назад</button>
                    </div>

            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}