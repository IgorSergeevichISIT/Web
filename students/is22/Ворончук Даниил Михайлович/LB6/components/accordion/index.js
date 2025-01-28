export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `  
              <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${data.pos}">
                    <button class="accordion-button${data.collapse}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${data.pos}" aria-expanded="true" aria-controls="collapse${data.pos}">
                        ${data.name}
                    </button>
                    </h2>
                    <div id="collapse${data.pos}" class="accordion-collapse collapse${data.show}" aria-labelledby="heading${data.pos}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="h"><strong>${data.name}</strong></div>
                            <img src="${data.src}" class="img-fluid" alt="...">
                            <button type="button" class="btn btn-primary mybt" id="click-card-${data.id}" data-id="${data.id}" data-src="${data.src}" data-name="${data.name}" data-info="${data.info}">Подробнее о породе</button>
                        </div>
                    </div>
                </div> 
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}