export class ProductCard {
    constructor (parent) {
        this.parent = parent;
        this.html = "";
    }

    getHTML(data) {
        return (
            // `
            //     <div class="card ms-3 mt-3" style="width: 300px;">
            //         <img class="card-img-top" src="${data.src}" alt="картинка">
            //         <div class="card-body">
            //             <h5 class="card-title">${data.title}</h5>
            //             <p class="card-text">${data.text}</p>
            //             <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
            //         </div>
            //     </div>
            // `
            `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <h5 class="card-title">${data.text}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                    <button class="btn btn-primary" id="delete-card-${data.id}" data-id="${data.id}">Удалить карточку</button>
                </div>
            </div>
        `
        )
    }

    addListeners(data, clickCard, deleteCard) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", () => {
                clickCard(data.id)
            })

            document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", () => {
                deleteCard(data.id)
            })
    }
    
    render(data, clickCard, deleteCard) {
        data.forEach(item => {
            this.html += this.getHTML(item)
        });
        this.parent.insertAdjacentHTML('beforeend', `<div class="d-flex">${this.html}</div>`)
        data.forEach(item => {
            this.addListeners(item, clickCard, deleteCard)
        })
    }
}