export class FilterComponent {
    constructor(parent, onFilterChange) {
        this.parent = parent;
        this.onFilterChange = onFilterChange;
    }

    getHTML() {
        return `
            <div class="filter-container">
                <label for="filter">Фильтр:</label>
                <select id="filter" name="filter">
                    <option value="">Все</option>
                    <option value="managers">Модерация</option>
                </select>
            </div>
        `;
    }

    addListeners() {
        const filterSelect = document.getElementById('filter');
        filterSelect.addEventListener('change', (e) => {
            this.onFilterChange(e.target.value);
        });
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.addListeners();
    }
}