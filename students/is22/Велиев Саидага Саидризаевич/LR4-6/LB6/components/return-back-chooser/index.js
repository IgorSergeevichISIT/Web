
export class ReturnBackChooserComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Генерируем HTML для выпадающего списка с id удаленных пользователей
        
        const options = data.map(id => {
            return `<option value="${id}">Пользователь ${id}</option>`;
        }).join(''); // join('') соединяет все элементы в одну строку
    
        return (
            `
            <div class="deleted-user-choose" style="margin-top: 5px;">
                <label for="city">Удаленные пользователи:</label>
                <select id="deleted_users" name="user" class="user-select">
                    ${options}
                </select>
                <button id="return_user_button" class="btn btn-primary add-back-btn">
                    Добавить обратно
                </button>
            </div>
            `
        );
    }

    addListener(listener) {
        const button = this.parent.querySelector('#return_user_button');
        const list = this.parent.querySelector('#deleted_users');
    
        button.addEventListener('click', (e) => {
            // Получаем выбранное значение из <select>
            const selectedUserId = list.value; // это будет значение выбранного option
            listener(selectedUserId); // передаем id выбранного пользователя в listener
        });
    }

    render(data,listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListener(listener);
    }
}
