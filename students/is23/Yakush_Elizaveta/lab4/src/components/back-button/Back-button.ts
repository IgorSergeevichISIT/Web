export class BackButtonComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private addListeners(listener: () => void): void {
        const btn = document.getElementById("back-button");
        if (!btn) throw new Error("Back button not found");
        btn.addEventListener("click", listener);
    }

    private getHTML(): string {
        return `
      <button id="back-button" class="btn btn-success" type="button">Назад</button>
    `;
    }

    render(listener: () => void): void {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(listener);
    }
}
