export interface ProductData {
    id: number;
    src: string;
    title: string;
    text: string;
    color?: string; // можно менять цвет карточки
}
export class ProductComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(data: ProductData): string {
        return `
        <div class="card mb-3" 
     style="
        width: 400px;        /* новая ширина карточки */
        background-color: ${data.color || '#fdfcfb'};
        border-radius: 30px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
     ">
    
   <img src="${data.src}" 
     alt="картинка"
     style="
        width: 90%;               /* чуть меньше, чтобы был отступ слева/справа */
        max-width: 400px;         /* не растягивать больше карточки */
        height: 300px;            /* нужная высота */
        object-fit: cover;        /* сохраняет пропорции */
        border-radius: 30px 30px 0 0;
        display: block;
        margin: 0 auto;           /* центрируем горизонтально */
     ">

    
    <div class="card-body" style="padding: 20px;">
        <h5 class="card-title" style="font-size: 20px;">${data.title}</h5>
        <p class="card-text" style="font-size: 14px;">${data.text}</p>
    </div>
</div>

        `;
    }

    render(data: ProductData): void {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
