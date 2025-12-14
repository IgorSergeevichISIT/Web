// SOLID S: ОТВЕТСТВЕННОСТЬ: Только рендеринг и управление фильтром сортировки

// DIP (Dependency Inversion Principle): внедрение зависимостей через конструкторы.
// Зависимость внедряется извне. Колбэки как зависимости. 

export class SortFilterComponent {
    constructor(parent, currentSort = '', onSortChange = null) {
        this.parent = parent;
        this.currentSort = currentSort;
        this.onSortChange = onSortChange; // SortFilterComponent принимает колбэк onSortChange извне, а не создаёт его сам
    }

    getHTML() {
        return `
            <div class="sort-filter mb-4">
                <label for="sort-select" class="form-label">
                    <i class="bi bi-filter-circle"></i> Сортировка участников:
                </label>
                <select id="sort-select" class="form-select" style="width: 250px;">
                    <option value="" ${this.currentSort === '' ? 'selected' : ''}>
                        Без сортировки
                    </option>
                    <option value="id_asc" ${this.currentSort === 'id_asc' ? 'selected' : ''}>
                        ID по возрастанию ↑
                    </option>
                    <option value="id_desc" ${this.currentSort === 'id_desc' ? 'selected' : ''}>
                        ID по убыванию ↓
                    </option>
                    <option value="time_asc" ${this.currentSort === 'time_asc' ? 'selected' : ''}>
                        Дата вступления ↑ (ранние)
                    </option>
                    <option value="time_desc" ${this.currentSort === 'time_desc' ? 'selected' : ''}>
                        Дата вступления ↓ (поздние)
                    </option>
                </select>
                
                ${this.getSortDescription(this.currentSort)}
            </div>
        `;
    }

    getSortDescription(sort) {
        const descriptions = {
            '': 'Показываются все участники в порядке получения от API',
            'id_asc': 'Участники отсортированы по ID (от меньшего к большему)',
            'id_desc': 'Участники отсортированы по ID (от большего к меньшему)',
            'time_asc': 'Участники отсортированы по дате вступления (ранние в начале)',
            'time_desc': 'Участники отсортированы по дате вступления (поздние в начале)'
        };
        
        const description = descriptions[sort] || descriptions[''];
        
        return `
            <div class="sort-description mt-2">
                <small class="text-muted">
                    <i class="bi bi-info-circle"></i> ${description}
                </small>
            </div>
        `;
    }

    addListeners() {
        const selectElement = document.getElementById('sort-select');
        if (selectElement && this.onSortChange) {
            selectElement.addEventListener('change', (e) => {
                const newSort = e.target.value;
                console.log('Изменена сортировка на:', newSort);
                this.onSortChange(newSort);
            });
        }
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners();
    }

    update(sort) {
        this.currentSort = sort;

        const selectElement = document.getElementById('sort-select');
        if (selectElement) {
            selectElement.value = sort;

            const descriptionElement = this.parent.querySelector('.sort-description');
            if (descriptionElement) {
                descriptionElement.outerHTML = this.getSortDescription(sort);
            }
        }
    }
}