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

                <button class="btn btn-primary w-100 mt-2" data-id="${user.id}" data-action="details">
                    Подробнее
                </button>

                <button class="btn btn-danger w-100 mt-2" data-id="${user.id}" data-action="remove">
                    Удалить
                </button>
            </div>
        </div>`;
    }


    render(user: any, onDetails: () => void, onRemove: () => void): void {
        const html = this.getHTML(user);
        this.parent.insertAdjacentHTML("beforeend", html);

        const detailsBtn = this.parent.querySelector(
            `button[data-id="${user.id}"][data-action="details"]`
        ) as HTMLElement;

        const removeBtn = this.parent.querySelector(
            `button[data-id="${user.id}"][data-action="remove"]`
        ) as HTMLElement;

        detailsBtn.addEventListener("click", () => onDetails());
        removeBtn.addEventListener("click", () => onRemove());
    }

}
