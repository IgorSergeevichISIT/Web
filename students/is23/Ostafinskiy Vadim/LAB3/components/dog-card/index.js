export class DogCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="${data.breed}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${data.breed}</h5>
                    <p class="card-text">${data.shortDescription}</p>
                    <button class="btn btn-primary" id="view-dog-${data.id}" data-id="${data.id}">
                        Подробнее
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`view-dog-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}