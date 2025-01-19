export class FilterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="mb-4">
                <label for="sort-select" class="mr-2 text-white">Сортировать по:</label>
                <select id="sort-select" class="bg-blue-500 text-white p-2 rounded">
                    <option value="default">По умолчанию</option>
                    <option value="first_name">Имя</option>
                    <option value="last_name">Фамилия</option>
                </select>
            </div>
        `;
    }

    addListeners(listener) {
        document
            .getElementById("sort-select")
            .addEventListener("change", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}