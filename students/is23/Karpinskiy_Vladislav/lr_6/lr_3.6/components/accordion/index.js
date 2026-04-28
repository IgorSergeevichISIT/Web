export class Accordion {
    constructor(parent, text) {
        this.parent = parent;
        this.text = text;
    }

    render() {
        const html = `
            <div>
                <button class="accordion-btn">Описание</button>
                <div class="accordion-panel" style="display:none;">
                    ${this.text}
                </div>
            </div>
        `;

        this.parent.insertAdjacentHTML("beforeend", html);

        const btn = this.parent.querySelector(".accordion-btn");
        const panel = this.parent.querySelector(".accordion-panel");

        btn.addEventListener("click", (event) => {
            event.stopPropagation(); // не открывать карточку!
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        });
    }
}