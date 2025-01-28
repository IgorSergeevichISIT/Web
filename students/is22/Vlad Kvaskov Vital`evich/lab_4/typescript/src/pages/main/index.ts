import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

import { arr } from "../../components/product-card/index.js";

export class MainPage {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private get pageRoot(): HTMLElement | null {
        return document.getElementById('main-page');
    }

    private getHTML(): string {
        return `
            <div id="main-page" class="d-flex flex-wrap"></div>
        `;
    }

    private getData(): void {
        ajax.post(urls.getConversations(groupId), (data: { response: { items: any[] } }) => {
            this.renderData(data.response.items);
        });
    }

    public render(): void {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }

    private renderData(items: any[]): void {
        items.forEach((item: any, index: number) => {
            const pageRoot = this.pageRoot;
            if (!pageRoot) return;

            const productCard = new ProductCardComponent(pageRoot);
            productCard.render({ ...item, id: index }, this.clickCard.bind(this));
        });
    }

    private clickCard(e: Event): void {
        const target = e.target as HTMLElement;

        if (!target || !target.dataset) return;

        const cardId = Number(target.dataset.id);
        
        const productPage = new ProductPage(this.parent, cardId, arr[cardId], groupId);
        productPage.render();
    }
}
