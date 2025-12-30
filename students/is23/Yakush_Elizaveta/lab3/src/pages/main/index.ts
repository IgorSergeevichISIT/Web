import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductPage } from "../product/Product";
import { products } from "../../data/products";    // данные (значение)
import type { ProductData } from "../../data/products"; // только тип
import { HeaderComponent } from "../../components/header/Header";

export class MainPage {
    private parent: HTMLElement;
    private filteredData: ProductData[];

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.filteredData = [...products];
    }
//проверка на наличие элемента
    private get pageRoot(): HTMLElement {
        const el = document.getElementById('main-page');
        if (!el) throw new Error("Main page root not found");
        return el;
    }

    private getHTML(): string {
        return `
            <div style="margin-bottom:20px;">
                <input id="filter-input" type="text" class="form-control" placeholder="Фильтр">
            </div>
            <div id="main-page" style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;"></div>
            <div style="margin-top:20px;text-align:center;">
                <button id="add-btn" class="btn btn-success">Добавить первую карточку</button>
            </div>
        `;
    }

    private renderCards(): void {
        this.pageRoot.innerHTML = '';
        this.filteredData.forEach(item => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(
                item,
                (id) => this.clickCard(id),
                (id) => this.removeCard(id)
            );
        });
    }


    private clickCard(id: number): void {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    private removeCard(id: number): void {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) products.splice(index, 1);

        this.filteredData = this.filteredData.filter(p => p.id !== id);
        this.renderCards();
    }

    private addCard(): void {
        if (products.length === 0) return;
        const first = products[0];
        const newCard: ProductData = { ...first, id: Math.max(...products.map(p => p.id)) + 1 };
        products.push(newCard);
        this.filteredData.push(newCard);
        this.renderCards();
    }

    private filterCards(query: string): void {
        const lowerQuery = query.toLowerCase();//не зав от регистра
        this.filteredData = products.filter(p => p.title.toLowerCase().includes(lowerQuery));
        this.renderCards();
    }

    render(): void {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(() => this.render());

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('add-btn')?.addEventListener('click', () => this.addCard());
        const filterInput = document.getElementById('filter-input') as HTMLInputElement;
        filterInput?.addEventListener('input', () => this.filterCards(filterInput.value));

        this.renderCards();
    }
}
