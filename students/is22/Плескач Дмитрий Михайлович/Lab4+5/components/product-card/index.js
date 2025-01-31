export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;  // Родительский элемент, куда будем добавлять карточки
        this.renderHeader();
    }

    renderHeader() {
        if (!document.querySelector('.header')) {
            const headerHTML = `
                <div class="header">
                    <h1 class="asd"></h1>
                </div>
            `;
            this.parent.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    getHTML(data) {
        return `
            <div class="card" id="card-${data.id}">
                <div class="card-header">
                    ID: ${data.id}
                </div>
                <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <button class="btn-btn-primary" id="click-card-${data.id}" data-id="${data.id}">Выбрать</button>
                    <button class="btn-btn-primary" id="add-card-${data.id}" data-id="${data.id}">Добавить</button>
                    <button class="btn-btn-danger" id="remove-card-${data.id}" data-id="${data.id}">Удалить</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
        document.getElementById(`add-card-${data.id}`).addEventListener("click", () => this.addCard(data));
        document.getElementById(`remove-card-${data.id}`).addEventListener("click", () => this.removeCard(data.id));
    }

    render(data, listener) {
        const html = this.getHTML(data);  // Получаем HTML для новой карточки
        this.parent.insertAdjacentHTML('beforeend', html);  // Вставляем в DOM
        this.addListeners(data, listener);  // Привязываем слушатели для кнопок
    }

    addCard(data) {
        // Создаем уникальные данные для клона
        const clonedData = { ...data, id: `${data.id}-clone-${Date.now()}` };  // Генерируем уникальный ID для клона
        const html = this.getHTML(clonedData);  // Получаем HTML для клонированной карточки
        this.parent.insertAdjacentHTML('beforeend', html);  // Вставляем клон в DOM
        this.addListeners(clonedData, () => this.selectCard(clonedData));  // Привязываем слушатели для кнопок на клонированной карточке
    }

    async removeCard(id) {
        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.remove();  // Удаление карточки из DOM
            await this.deleteCardFromServer(id);  // Удаление карточки из базы данных
        }
    }

    async deleteCardFromServer(id) {
        try {
            const response = await fetch(`http://localhost:8000/api/members/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении карточки с ID ${id}: ${response.statusText}`);
            }

            console.log(`Карточка с ID ${id} удалена из базы данных.`);
        } catch (error) {
            console.error('Ошибка при удалении карточки из базы данных:', error);
        }
    }

    selectCard(data) {
        // Логика выбора карточки (например, вы можете вывести alert, или что-то другое)
        console.log('Выбрана карточка:', data);
    }
}
