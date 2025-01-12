export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
        this.renderHeader();
    }

    renderHeader() {
        if (!document.querySelector('.header')) {
            const headerHTML = `
                <div class="header" style="width: 100vw; text-align: center; padding: 15px; background: linear-gradient(135deg,rgb(124, 45, 188),rgb(250, 150, 73)); color: white; font-family: 'Courier New', Courier, monospace;">
                    <h1 style="margin: 0; font-size: 3em;">Lobby</h1>
                </div>
            `;
            this.parent.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px; background: black; color: white; border: none; border-radius: 50px;">
                <div class="card-header" style="background: linear-gradient(135deg,rgb(114, 114, 114), #000000); color: #FFD700; text-align: center; padding: 10px; font-family: 'Arial', sans-serif;">
                    ID: ${data.id}
                </div>
                <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <div class="card-body" style="text-align: center;">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" style="background: linear-gradient(135deg,rgb(150, 213, 184), #FFD700); color: black; font-family: 'Arial', sans-serif; border: none; border-radius: 20px; padding: 10px 20px;">Выбрать</button>
                    <button class="btn btn-primary" id="add-card-${data.id}" data-id="${data.id}" style="background-color:#28a745;color:white;border:none;padding:10px;border-radius:5px;">Добавить</button>
                    <button class="btn btn-danger" id="remove-card-${data.id}" data-id="${data.id}" style="background-color:red;color:white;border:none;padding:10px;border-radius:5px;">Удалить</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
        document.getElementById(`add-card-${data.id}`).addEventListener("click", () => this.addCard(data));
        document.getElementById(`remove-card-${data.id}`).addEventListener("click", () => this.removeCard(data.id));
    }

    addCard(data) {
        this.render(data);
    }

    removeCard(id) {
        const card = document.getElementById(`click-card-${id}`);
        if (card) {
            card.closest('.card').remove();
            //this.deleteCardFromServer(id);
        }
    }

    async deleteCardFromServer(id) {
        try {
            const response = await fetch(`http://localhost:8000/api/members/${id}`, { method: 'DELETE' });
            
            if (!response.ok) {
                throw new Error(`Ошибка при удалении карточки с ID ${id}: ${response.statusText}`);
            }

            console.log(`Карточка с ID ${id} удалена.`);
        } catch (error) {
            console.error('Ошибка при удалении карточки:', error);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
