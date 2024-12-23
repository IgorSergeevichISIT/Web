export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="product-container">
                <div class="product-image">
                    <img src="${data.src}">
                </div>
                <div class="accordion product-accordion" id="${this.uniqueId}">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="${this.uniqueId}-headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#${this.uniqueId}-collapseOne" aria-expanded="true" 
                                aria-controls="${this.uniqueId}-collapseOne">
                                История
                            </button>
                        </h2>
                        <div id="${this.uniqueId}-collapseOne" class="accordion-collapse collapse show" 
                            aria-labelledby="${this.uniqueId}-headingOne" data-bs-parent="#${this.uniqueId}">
                            <div class="accordion-body">
                                <p class="card-text">${data.history}</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="${this.uniqueId}-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#${this.uniqueId}-collapseTwo" aria-expanded="false" 
                                aria-controls="${this.uniqueId}-collapseTwo">
                                Популярность/распространение
                            </button>
                        </h2>
                        <div id="${this.uniqueId}-collapseTwo" class="accordion-collapse collapse" 
                            aria-labelledby="${this.uniqueId}-headingTwo" data-bs-parent="#${this.uniqueId}">
                            <div class="accordion-body">
                                ${data.popular}
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="${this.uniqueId}-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#${this.uniqueId}-collapseThree" aria-expanded="false" 
                                aria-controls="${this.uniqueId}-collapseThree">
                                Значение
                            </button>
                        </h2>
                        <div id="${this.uniqueId}-collapseThree" class="accordion-collapse collapse" 
                            aria-labelledby="${this.uniqueId}-headingThree" data-bs-parent="#${this.uniqueId}">
                            <div class="accordion-body">
                                ${data.smisol}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


    render(data) {
        console.log('Рендерим аккордеон');
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}