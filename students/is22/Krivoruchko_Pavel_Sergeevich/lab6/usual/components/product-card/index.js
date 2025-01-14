export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px; margin: 15px auto">
                    <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                        <button class="btn btn-primary" id="delete-card-${data.id}" data-id="${data.id}" style="margin-top:5px">Удалить карточку</button>
                    </div>
                </div>
            `
        )
    }
    
    addListenersClick(data, listener) {//
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    addListenersDelete(data, listener) {//
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener_click, listener_delete) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListenersClick(data, listener_click)
        this.addListenersDelete(data, listener_delete)
    }
}