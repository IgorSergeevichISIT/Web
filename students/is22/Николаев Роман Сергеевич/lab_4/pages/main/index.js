import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import { FilterComponent } from "../../components/FilterComponent.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filter = '';
    }

    getHTML() {
        return (
            `
            <div id="filter-container"></div>
            <div id="main-page" class="d-flex flex-wrap"></div>
            `
        )
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    get filterRoot() {
        return document.getElementById('filter-container');
    }

    getData() {
        ajax.post(urls.getGroupMembers(groupId, this.filter), (data) => {
            this.renderData(data.response.items);
        });
    }

    renderData(items) {
        this.pageRoot.innerHTML = '';
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    onFilterChange(filter) {
        this.filter = filter;
        this.getData();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const filterComponent = new FilterComponent(this.filterRoot, this.onFilterChange.bind(this));
        filterComponent.render();

        this.getData();
    }
}