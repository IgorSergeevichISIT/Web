export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(accordionItems) {
        return `
            <div class="accordion mt-4" id="dogAccordion">
                ${accordionItems.map((item, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target="#collapse${item.id}"
                                    aria-expanded="false" 
                                    aria-controls="collapse${item.id}">
                                ${item.title}
                            </button>
                        </h2>
                        <div id="collapse${item.id}" 
                             class="accordion-collapse collapse"
                             data-bs-parent="">
                            <div class="accordion-body">
                                ${item.content}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    render(accordionItems) {
        const html = this.getHTML(accordionItems);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}