export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="accordion mt-4" id="accordion-${data.id}">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#collapse-${data.id}" aria-expanded="true" 
                                aria-controls="collapse-${data.id}">
                            ${data.title}
                        </button>
                    </h2>
                    <div id="collapse-${data.id}" class="accordion-collapse collapse show" 
                         data-bs-parent="#accordion-${data.id}">
                        <div class="accordion-body">
                            ${data.content}
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}