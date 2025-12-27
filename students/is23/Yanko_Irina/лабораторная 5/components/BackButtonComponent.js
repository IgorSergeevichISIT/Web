export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
            <button type="button" class="btn btn-secondary mb-3" id="back-button">
                ← Назад к списку
            </button>
            `
        )
    }

    render(click) {
        const html = this.getHTML()
        this.parent.innerHTML = html
        
        document.getElementById('back-button').addEventListener('click', click)
    }
}