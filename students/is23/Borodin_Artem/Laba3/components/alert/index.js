/**
 * Компонент Alert - для отображения уведомлений
 * Используется Bootstrap Alert компонент
 */
export class AlertComponent {
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * Генерирует HTML для Alert компонента
     * @param {Object} data - данные для Alert
     * @param {string} data.type - тип Alert (success, danger, info, warning)
     * @param {string} data.message - сообщение Alert
     * @param {string} data.id - уникальный ID для Alert
     * @returns {string} HTML Alert компонента
     */
    getHTML(data) {
        const alertClasses = {
            success: 'alert-success',
            danger: 'alert-danger',
            info: 'alert-info',
            warning: 'alert-warning'
        };

        const alertClass = alertClasses[data.type] || 'alert-info';

        return `
            <div id="${data.id}" class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    /**
     * Отрисовывает Alert компонент
     * @param {Object} data - данные для Alert
     */
    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
