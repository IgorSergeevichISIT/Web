// components/product-card/index.js
class ProductCardComponent {
    constructor(parent) {
        this.parent = parent; 
    }

    render(data, onClick) {
        const imgSrc = data.photo_400;
        const html = `
            <div class="col">
                <div class="card h-100">
                    <img src="${imgSrc}" class="card-img-top" style="height:300px; object-fit:cover;" alt="${data.first_name}">
                    <div class="card-body">
                        <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                        <button class="btn btn-primary" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);

        
        const btn = this.parent.querySelector(`button[data-id="${data.id}"]`);
        btn?.addEventListener('click', () => onClick(data.id));
    }
}

export default ProductCardComponent;