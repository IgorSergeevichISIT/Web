
export class DogCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col">
                <div class="card h-100" id="dog-card-${data.id}">
                    <img src="${data.img}" class="card-img-top" alt="${data.name}">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <div class="accordion accordion-flush" id="accordion-${data.id}">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-heading-${data.id}">
                                    <button class="accordion-button collapsed" type="button" 
                                            data-bs-toggle="collapse" 
                                            data-bs-target="#flush-collapse-${data.id}" 
                                            aria-expanded="false" 
                                            aria-controls="flush-collapse-${data.id}">
                                        Краткая информация
                                    </button>
                                </h2>
                                <div id="flush-collapse-${data.id}" class="accordion-collapse collapse" 
                                     aria-labelledby="flush-heading-${data.id}" 
                                     data-bs-parent="#accordion-${data.id}">
                                    <div class="accordion-body">
                                        ${data.short}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-primary mt-2" id="btn-more-${data.id}">Подробнее</button>
                        <button class="btn btn-danger mt-2" id="btn-delete-${data.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onMoreClick, onDeleteClick) {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

        document.getElementById(`btn-more-${data.id}`)
            .addEventListener("click", () => onMoreClick(data));

        document.getElementById(`btn-delete-${data.id}`)
            .addEventListener("click", () => onDeleteClick(data));
    }
}