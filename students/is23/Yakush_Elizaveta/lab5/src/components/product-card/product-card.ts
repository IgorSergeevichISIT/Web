export class ProductCardComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(user: any): string {
        return `
        <div class="card" style="width: 180px;">
            <img src="${user.photo_200 || ''}" class="card-img-top" alt="${user.first_name}">
            <div class="card-body">
                <h6 class="card-title text-center">
                    ${user.first_name} ${user.last_name}
                </h6>
                <button class="btn btn-primary w-100 mt-2" data-id="${user.id}">
                    Подробнее
                </button>
            </div>
        </div>`;
    }

    render(user: any, onClick: () => void): void {
        const html = this.getHTML(user);
        this.parent.insertAdjacentHTML("beforeend", html);

        const btn = this.parent.querySelector(`button[data-id="${user.id}"]`) as HTMLElement;
        btn.addEventListener("click", () => onClick());
    }
}
