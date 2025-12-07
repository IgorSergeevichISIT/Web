class Filter {
    /**
     * @param {string} parentSelector - селектор HTML элемента, где рендерить фильтр
     * @param {function} onFilterChange - callback функция, вызывается при изменении фильтра
     */
    constructor(parentSelector, onFilterChange) {
        this.parent = document.querySelector(parentSelector);
        this.onFilterChange = onFilterChange;
        
        this.filterOptions = [
            { value: '', label: 'Все участники' },
            { value: 'friends', label: 'Друзья' },
            { value: 'unsure', label: 'Возможно пойду' },
            { value: 'managers', label: 'Руководители' },
            { value: 'donut', label: 'VK Donut' },
            { value: 'invites', label: 'Приглашённые' }
        ];
    }

    render() {
        const html = `
            <div class="filter-container">
                <label for="filter-select">Выбери фильтр:</label>
                <select id="filter-select" class="filter-select">
                    ${this.filterOptions.map(option => 
                        `<option value="${option.value}">${option.label}</option>`
                    ).join('')}
                </select>
            </div>
        `;
        
        this.parent.innerHTML = html;

        const select = this.parent.querySelector('#filter-select');

        select.addEventListener('change', (event) => {
            const selectedFilter = event.target.value;
            this.onFilterChange(selectedFilter);
        });
    }
}

export { Filter };
