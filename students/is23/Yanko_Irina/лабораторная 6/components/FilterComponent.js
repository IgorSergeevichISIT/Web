export class FilterComponent {
    constructor(parent, currentFilter = 'all', onFilterChange) {
        this.parent = parent;
        this.currentFilter = currentFilter;
        this.onFilterChange = onFilterChange;
    }

    getHTML() {
        return (
            `
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h5 class="card-title mb-3">
                        <i class="bi bi-funnel me-2"></i>Фильтр участников группы (VK API)
                    </h5>
                    <div class="mb-3">
                        <label for="filterSelect" class="form-label">Тип участников:</label>
                        <select id="filterSelect" class="form-select">
                            <option value="all" ${this.currentFilter === 'all' ? 'selected' : ''}>Все участники</option>
                            <option value="friends" ${this.currentFilter === 'friends' ? 'selected' : ''}>Друзья</option>
                            <option value="managers" ${this.currentFilter === 'managers' ? 'selected' : ''}>Руководители</option>
                        </select>
                    </div>
                </div>
            </div>
            `
        )
    }

    render() {
        const html = this.getHTML();
        this.parent.innerHTML = html;
        
        const filterSelect = document.getElementById('filterSelect');
        
        filterSelect.addEventListener('change', (e) => {
            const newFilter = e.target.value;
            console.log(`Фильтр VK API изменен: ${newFilter}`);
            this.currentFilter = newFilter;
            
            if (this.onFilterChange) {
                this.onFilterChange(newFilter);
            }
        });
    }
}