export class SortPanelComponent {
    constructor(parent) {
        this.parent = parent;
    }

    // Метод для сохранения выбранного значения
    saveSelectedValue(value) {
        localStorage.setItem('selectedSort', value);
    }

    // Метод для восстановления выбранного значения
    loadSelectedValue() {
        const savedValue = localStorage.getItem('selectedSort');
        if (savedValue) {
            const selectElement = document.getElementById('sort-select');
            const optionToSelect = selectElement.querySelector(`option[data-sort="${savedValue}"]`);
            if (optionToSelect) {
                optionToSelect.selected = true;  // Устанавливаем выбранный option
            }
        }
    }

    // Метод для обработки изменений в select
    addListener(listener) {
        const selectElement = this.parent.querySelector('#sort-select');
        selectElement.addEventListener("change", (e) => {
            const sortMode = e.target.selectedOptions[0].dataset.sort;
            console.log('Выбранный режим сортировки:', sortMode);
            listener(sortMode, "sort-switch");  // Передаем режим сортировки в обработчик

            // Сохраняем выбранный режим в localStorage
            this.saveSelectedValue(sortMode);
        });
    }

    // Рендеринг компонента
    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Загружаем сохраненное значение перед добавлением слушателя
        this.loadSelectedValue();

        // Добавляем слушатель для отслеживания изменений
        this.addListener(listener);
    }

    getHTML() {
        return `
            <div class="mb-3">
                <label for="sort-select" class="form-label">Сортировка:</label>
                <select class="form-select" id="sort-select">
                    <option data-sort="id_asc">По ID (возрастание)</option>
                    <option data-sort="id_desc">По ID (убывание)</option>
                    <option data-sort="time_asc">По времени вступления (сначала старые)</option>
                    <option data-sort="time_desc">По времени вступления (сначала новые)</option>
                </select>
            </div>
        `;
    }
}
