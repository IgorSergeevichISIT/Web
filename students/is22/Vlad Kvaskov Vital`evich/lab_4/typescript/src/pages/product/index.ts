import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    private parent: HTMLElement;
    private id: number;
    private pId: number;
    private gId: number;

    constructor(parent: HTMLElement, id: number, pId: number, gId: number) {
        this.parent = parent;
        this.id = id;
        this.gId = gId;
        this.pId = pId;
    }

    private getData(): void {
        console.log(this.pId);
        console.log(this.gId);
        ajax.post(urls.getConversationsById(this.pId, this.gId), (data: { response: { items: any[] } }) => {
            this.renderData(data.response.items);
        });
    }

    private get pageRoot(): HTMLElement | null {
        return document.getElementById('product-page');
    }

    private getHTML(): string {
        return `
            <div id="product-page"></div>
        `;
    }

    private clickBack(): void {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    private renderData(item: any[]): void {
        const pageRoot = this.pageRoot;
        if (!pageRoot) return;

        const product = new ProductComponent(pageRoot);
        console.log(this.id);
        product.render(item[0]);
    }

    public render(): void {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const pageRoot = this.pageRoot;
        if (!pageRoot) return;

        const backButton = new BackButtonComponent(pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}