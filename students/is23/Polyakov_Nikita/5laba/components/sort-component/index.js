class SortComponent {
    constructor(parent) {
        this.parent = parent;
        this.sortOptions = [
            { value: 'id_asc', label: 'По ID ↑' },
            { value: 'id_desc', label: 'По ID ↓' },
            { value: 'name_asc', label: 'По имени A-Я' },
            { value: 'name_desc', label: 'По имени Я-A' }
        ];
    }

    render(onChange) {
        const html = `
            <div class="mb-3">
                <label class="form-label">Сортировка:</label>
                <select class="form-select" id="sort-select">
                    ${this.sortOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
                </select>
            </div>
        `;
        this.parent.innerHTML = html;
        document.getElementById('sort-select').addEventListener('change', e => onChange(e.target.value));
    }
}

export default SortComponent;