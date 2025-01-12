export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
  
    getHTML(data) {
        return `
            <div class="card" style="width: 300px; margin: 10px;">
                <img class="card-img-top" src="${data.src}" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                    <button class="btn btn-danger" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                </div>
            </div>
        `;
    }
  
    render(data, listener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
  
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", () => deleteListener(data.id));
    }
  }
  