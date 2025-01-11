import { ProductCardComponent } from "../../components/product-card";
import { ProductPage } from "../product";
import { ajax } from "../../modules/ajax";
import { urls } from "../../modules/urls";
import { groupId } from "../../modules/consts";
import { SortPanelComponent } from "../../components/sort-panel";
export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }
    getData(mode) {
        ajax.post(urls.getGroupMembers(groupId, mode), (data) => {
            this.renderData(data.response.items);
        });
    }
    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(document.getElementById('main-page'));
            productCard.render(item, this.clickCard.bind(this));
        });
    }
    clickCard(e) {
        const target = e.target;
        const cardId = target.dataset.id || '';
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }
    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const sort = new SortPanelComponent(this.parent);
        sort.render(this.getData.bind(this));
        this.getData("");
    }
}
