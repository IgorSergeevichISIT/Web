import { ProductCardComponent } from "../../Components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap"></div>
        `;
    }

    renderData(items) {
        if (this.productCardsContainer) {
            this.productCardsContainer.innerHTML = '';
        } else {
            this.productCardsContainer = document.createElement('div');
            this.productCardsContainer.id = 'product-cards-container';
            this.productCardsContainer.classList.add('d-flex', 'flex-wrap');
            this.pageRoot.appendChild(this.productCardsContainer);
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.productCardsContainer);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    updateDataWithGroupId() {
        ajax.post(urls.getGroupMembers(groupId), '', (data) => {
            this.renderData(data.response.items);
        });
    }

    getData() {
        this.updateDataWithGroupId();
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
    }
}
