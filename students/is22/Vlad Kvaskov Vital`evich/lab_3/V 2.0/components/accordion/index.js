export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div id="accordionExample">
                ${data.map(item => `
                    <div class="border rounded-lg p-4">
                        <h2>
                            <button 
                                class="w-full" 
                                type="button" 
                                id="toggle-${item.id}">
                                ${item.title}
                            </button>
                        </h2>
                        <div id="collapse-${item.id}" class="hidden border-t p-4">
                            <img src="${item.src}" class="mb-4">
                            ${item.text}
                            <button 
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" 
                                id="click-card-${item.id}" 
                                data-id="${item.id}">
                                ${item.name}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    addListeners(data, listener) {
        data.forEach(item => {
            const toggleButton = document.getElementById(`toggle-${item.id}`);
            const collapseSection = document.getElementById(`collapse-${item.id}`);

            if (toggleButton && collapseSection) {
                toggleButton.addEventListener("click", () => {
                    collapseSection.classList.toggle("hidden");
                });
            }

            const clickButton = document.getElementById(`click-card-${item.id}`);
            if (clickButton) {
                clickButton.addEventListener("click", listener);
            }
        });
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, listener);
    }
}
