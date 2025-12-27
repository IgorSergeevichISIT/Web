export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const status = data.status ? data.status.substring(0, 50) + (data.status.length > 50 ? '...' : '') : 'Нет статуса';
        
        return (`
            <div class="card" style="width: 300px; margin: 10px;">
                <img class="card-img-top" src="${data.photo_max}" alt="фото пользователя" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <p class="card-text"><small>Статус: ${status}</small></p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `)
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }
}