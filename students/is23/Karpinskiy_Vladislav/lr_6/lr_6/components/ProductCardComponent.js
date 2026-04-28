export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="card shadow-sm" style="width: 260px;">
                
                <img src="${data.src}" class="card-img-top user-img" alt="avatar">

                <div class="card-body d-flex flex-column">
                    
                    <h5 class="card-title">${data.title}</h5>
                    
                    <p class="card-text text-muted">
                        ${data.text}
                    </p>

                    <!-- кнопки -->
                    <div class="d-flex justify-content-between mt-auto">
                        <button class="btn btn-primary" id="open-${data.id}">
                            Открыть
                        </button>

                        <button class="btn btn-danger" id="delete-${data.id}">
                            Удалить
                        </button>
                    </div>

                </div>
            </div>
        `
    }

    render(data, openHandler, deleteHandler) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data))

        document
            .getElementById(`open-${data.id}`)
            .addEventListener('click', () => openHandler(data.id))

        document
            .getElementById(`delete-${data.id}`)
            .addEventListener('click', () => deleteHandler(data.id))
    }
}