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
    const options = this.filterOptions
      .map(opt => `<option value="${opt.value}">${opt.label}</option>`)
      .join('');

    const html = `
      <select id="filter-select" class="filter-select">
        ${options}
      </select>
    `;

    this.parent.insertAdjacentHTML('beforeend', html);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const select = document.getElementById('filter-select');
    select.addEventListener('change', (e) => {
      this.onFilterChange(e.target.value);
    });
  }
}

export { Filter };
