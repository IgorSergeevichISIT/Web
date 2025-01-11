export class SortPanelComponent {
    constructor(parent) {
        this.parent = parent;
    }

    // Метод для сохранения выбранного значения
    saveSelectedValue(value) {
        localStorage.setItem('selectedFilter', value);
    }

    // Метод для восстановления выбранного значения
    loadSelectedValue() {
        const savedValue = localStorage.getItem('selectedFilter');
        if (savedValue) {
            const selectElement = document.getElementById('filter-select');
            const optionToSelect = selectElement.querySelector(`option[data-filter="${savedValue}"]`);
            if (optionToSelect) {
                optionToSelect.selected = true;  // Устанавливаем выбранный option
            }
        }
    }

    // Метод для обработки изменений в select
    addListener(listener) {
        const selectElement = this.parent.querySelector('#filter-select');
        selectElement.addEventListener("change", (e) => {
            const filterMode = e.target.selectedOptions[0].dataset.filter;
            console.log('Выбранный режим сортировки:', filterMode);
            listener(filterMode, "sort-switch");  // Передаем режим сортировки в обработчик

            // Сохраняем выбранный режим в localStorage
            this.saveSelectedValue(filterMode);
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
            <div class="filter-container">
                <label for="filter">Фильтр:</label>
                <select id="filter-select" name="filter">
                    <option data-filter="">Все</option>
                    <option data-filter="friends">Друзья</option>
                </select>
            </div>
        `;
    }
}
