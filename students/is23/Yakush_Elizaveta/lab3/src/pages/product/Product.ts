import { ToastComponent } from "../../components/toast/Toast";
import { ProductComponent } from "../../components/product1/product1";
import { MainPage } from "../main/index";
import { HeaderComponent } from "../../components/header/Header";
import { products } from "../../data/products";    // данные (значение)
import type { ProductData } from "../../data/products"; // только тип


export class ProductPage {
    parent: HTMLElement;
    id: number;

    constructor(parent: HTMLElement, id: number) {
        this.parent = parent;
        this.id = id;
    }

    private getData(): ProductData {
        return products.find(p => p.id === this.id) ?? products[0];
    }

    get pageRoot(): HTMLElement {
        const el = document.getElementById("product-page");
        if (!el) throw new Error("Product page root not found");
        return el;
    }

    private getHTML(): string {
        return `<div id="product-page" style="padding:20px;"></div>`;
    }

    private clickBack() {
        const main = new MainPage(this.parent);
        main.render();
    }

    render(): void {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(() => this.clickBack()); // кнопка Домой

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const product = new ProductComponent(this.pageRoot);
        product.render(this.getData());


        const toast = new ToastComponent(document.body);
        toast.render(`Открыта карточка №${this.id}`);
    }
}
