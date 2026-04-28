export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    render(callback) {
        this.parent.insertAdjacentHTML(
            'beforeend',
            `<button class="btn btn-secondary mb-3">← Назад</button>`
        )

        this.parent
            .querySelector('button')
            .addEventListener('click', callback)
    }
}