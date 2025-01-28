import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { arr } from "../../components/product-card/index.js";
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
    getData() {
        ajax.post(urls.getConversations(groupId), (data) => {
            this.renderData(data.response.items);
        });
    }
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }
    renderData(items) {
        items.forEach((item, index) => {
            const pageRoot = this.pageRoot;
            if (!pageRoot)
                return;
            const productCard = new ProductCardComponent(pageRoot);
            productCard.render(Object.assign(Object.assign({}, item), { id: index }), this.clickCard.bind(this));
        });
    }
    clickCard(e) {
        const target = e.target;
        if (!target || !target.dataset)
            return;
        const cardId = Number(target.dataset.id);
        const productPage = new ProductPage(this.parent, cardId, arr[cardId], groupId);
        productPage.render();
    }
}
