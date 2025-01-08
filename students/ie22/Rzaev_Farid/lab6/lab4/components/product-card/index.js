export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 290px;">
                    <img class="card-img-top" src="${data.src}" alt="Фото пользователя">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <button class="btn btn-primary" style="margin-bottom: 20px;" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                        <button class="btn btn-primary" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            `
        );
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
        
    }

    render(data, listener,listener1) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", listener1);
    }
}
