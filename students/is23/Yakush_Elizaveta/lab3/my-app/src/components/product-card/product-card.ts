import type { ProductData } from "../product1/product1";

export class ProductCardComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(data: ProductData): string {
        return `
    <div class="card mb-4" style="
        position: relative;
        width: 250px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        background: #fff;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
    ">
        <button id="delete-btn-${data.id}" style="
            position: absolute;
            top: 5px;
            right: 5px;
            border: none;
            background: green;
            color: white;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            padding: 0;
        ">×</button>

        <img src="${data.src}" style="width:100%; height:180px; object-fit:cover;">
        
        <div class="card-body d-flex flex-column">
            <h5 style="font-size:16px;">${data.title}</h5>
            <p style="font-size:14px; flex-grow:1;">${data.text}</p>
            <button id="card-btn-${data.id}" class="btn btn-success mt-auto">Подробнее</button>
        </div>
    </div>
    `;
    }


    render(
        data: ProductData,
        onClick?: (id: number) => void,
        onDelete?: (id: number) => void
    ): void {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        const btn = document.getElementById(`card-btn-${data.id}`);
        btn?.addEventListener('click', () => onClick?.(data.id));

        const deleteBtn = document.getElementById(`delete-btn-${data.id}`);
        deleteBtn?.addEventListener('click', () => onDelete?.(data.id));

        const cardEl = this.parent.lastElementChild as HTMLElement;
        cardEl.addEventListener("mouseenter", () => {
            cardEl.style.transform = "scale(1.05)";
            cardEl.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
        });
        cardEl.addEventListener("mouseleave", () => {
            cardEl.style.transform = "scale(1)";
            cardEl.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
        });
    }
}
