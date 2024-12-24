export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="accordion" id="accordionExample" style="width: 700px; margin: 0 auto;">
                ${data.map(item => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${item.id}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${item.id}" aria-expanded="false" aria-controls="collapse${item.id}">
                                ${item.title}
                            </button>
                        </h2>
                        <div id="collapse${item.id}" class="accordion-collapse collapse" aria-labelledby="heading${item.id}">
                            <div class="accordion-body">
                                ${item.text}<br>
                                <button class="btn btn-primary" id="click-card-${item.id}" data-id="${item.id}">Подробно</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    addListeners(data, listener) {
        data.forEach(item => {
            document
                .getElementById(`click-card-${item.id}`)
                .addEventListener("click", listener);
        });
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, listener);
    }
}
