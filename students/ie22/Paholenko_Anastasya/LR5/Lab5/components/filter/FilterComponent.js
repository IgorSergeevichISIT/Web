export class FilterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="flex space-x-4 mt-4">
                <select id="filter-select" class="p-2 rounded">
                    <option value="first_name">Имя</option>
                    <option value="last_name">Фамилия</option>
                </select>
                <button id="apply-filter" class="p-2 bg-blue-500 text-white rounded">Применить фильтр</button>
            </div>
        `;
    }

    addListeners(onFilter) {
        const applyFilterButton = document.getElementById('apply-filter');
        applyFilterButton.addEventListener('click', () => {
            const filterSelect = document.getElementById('filter-select');
            onFilter(filterSelect.value);
        });
    }

    render(onFilter) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(onFilter);
    }
}