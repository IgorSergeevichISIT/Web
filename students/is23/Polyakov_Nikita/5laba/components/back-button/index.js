class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(onClick) {
        const html = `
            <button class="btn btn-secondary" id="back-button">← Назад</button>
        `;
        this.parent.innerHTML = html;

        document.getElementById('back-button').addEventListener('click', onClick);
    }
}

export default BackButtonComponent;