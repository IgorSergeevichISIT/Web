export class SortComponent {
    constructor(parent, onChange) {
        this.parent = parent;
        this.onChange = onChange; // Функция для обработки изменения фильтра
    }

    getHTML() {
        return `
            <div class="mb-3">
                <label for="sort-select" class="form-label">Сортировка:</label>
                <select class="form-select" id="sort-select">
                    <option value="id_asc">По ID (возрастание)</option>
                    <option value="id_desc">По ID (убывание)</option>
                    <option value="time_asc">По времени вступления (сначала старые)</option>
                    <option value="time_desc">По времени вступления (сначала новые)</option>
                </select>
            </div>
        `;
    }    

    addListeners() {
        document.getElementById('sort-select').addEventListener('change', (event) => {
            this.onChange(event.target.value); // Вызываем обработчик с новым значением
        });
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html); // Вставка сверху
        this.addListeners();
    }    
}