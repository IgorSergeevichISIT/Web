export class FilterComponent {
    constructor(parent) {
        this.parent = parent
    }

    render(callback) {
        this.parent.innerHTML = `
            <select class="form-select w-30" id="filter">
                <option value="all">Все</option>
                <option value="friends">Друзья</option>
            </select>
        `

        this.parent.querySelector('#filter')
            .addEventListener('change', (e) => {
                callback(e.target.value)
            })
    }
}