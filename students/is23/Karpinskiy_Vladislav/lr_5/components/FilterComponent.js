export class FilterComponent {
    constructor(parent) {
        this.parent = parent
    }

    render(callback) {
        this.parent.innerHTML = `
            <select class="form-select w-25" id="filter">
                <option value="friends">Все участники</option>
                <option value="managers">Админы</option>
            </select>
        `

        this.parent.querySelector('#filter')
            .addEventListener('change', (e) => {
                callback(e.target.value)
            })
    }
}