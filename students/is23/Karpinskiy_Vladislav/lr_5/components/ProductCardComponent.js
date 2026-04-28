export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 250px;">
                <img src="${data.photo_400_orig}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">
                        ${data.first_name} ${data.last_name}
                    </h5>
                    <button class="btn btn-primary" id="user-${data.id}">
                        Открыть
                    </button>
                </div>
            </div>
        `
    }

    render(data, clickHandler) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data))

        document
            .getElementById(`user-${data.id}`)
            .addEventListener('click', () => clickHandler(data.id))
    }
}