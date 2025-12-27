// components/SortComponent.js
export class SortComponent {
    constructor(parent, currentSort = 'id_asc', onSortChange) {
        this.parent = parent;
        this.currentSort = currentSort;
        this.onSortChange = onSortChange;
    }

    getHTML() {
        return `
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <h5 class="card-title mb-3">
                    <i class="bi bi-sort-down me-2"></i>Сортировка участников
                </h5>
                <div class="mb-3">
                    <label for="sortSelect" class="form-label">Сортировать по:</label>
                    <select id="sortSelect" class="form-select">
                        <option value="id_asc" ${this.currentSort === 'id_asc' ? 'selected' : ''}>ID (возрастание)</option>
                        <option value="id_desc" ${this.currentSort === 'id_desc' ? 'selected' : ''}>ID (убывание)</option>
                        <option value="time_asc" ${this.currentSort === 'time_asc' ? 'selected' : ''}>Времени добавления (старые)</option>
                        <option value="time_desc" ${this.currentSort === 'time_desc' ? 'selected' : ''}>Времени добавления (новые)</option>
                    </select>
                </div>
                <div class="alert alert-light small mb-0 border">
                    <i class="bi bi-info-circle me-1"></i>
                    Сортировка участников группы по выбранному параметру
                </div>
            </div>
        </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.innerHTML = html;
        
        const sortSelect = document.getElementById('sortSelect');
        
        sortSelect.addEventListener('change', (e) => {
            const newSort = e.target.value;
            console.log(`Сортировка изменена: ${newSort}`);
            this.currentSort = newSort;
            
            if (this.onSortChange) {
                this.onSortChange(newSort);
            }
        });
    }
}