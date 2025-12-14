import { BadgesComponent } from "../badges/index.js";

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2 shadow-sm" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="${data.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text flex-grow-1">${data.shortDescription}</p>
                    <p class="card-text"><strong class="text-success">${data.price}</strong></p>
                    
                    <!-- ЗНАЧКИ ПРОДУКТА -->
                    <div id="badges-${data.id}" class="mb-2"></div>
                    
                    <button class="btn btn-primary mt-auto" id="view-product-${data.id}" data-id="${data.id}">
                        📖 Подробнее
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`view-product-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Добавляем значки в карточку
        const badgesContainer = document.getElementById(`badges-${data.id}`);
        const badges = new BadgesComponent(badgesContainer);
        badges.render(data.badges);
        
        this.addListeners(data, listener);
    }
}