import { ProductCardComponent } from "../../Components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { ProductPage } from "../product/index.js";
import { AddPage } from "../add/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <button id = "add" class="btn btn-primary">Добавить</button>
            <div id="main-page" class="d-flex flex-wrap"></div>
        `;
    }
    addListener(listener) {
        document
            .getElementById(`add`)
            .addEventListener("click", listener);
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
            productCard.render(item, this.clickCard.bind(this),this.clickDelete.bind(this));
        });
    }

    updateData() {
        ajax.get(urls.getAllInfo(), (err, data) => {
            if (err) {
                console.error(err);
            } else {
                this.renderData(data);
            }
        });
    }

    getData() {
        this.updateData();
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }
    clickAdd(e) {
        const productPage = new AddPage(this.parent);
        productPage.render();
    }
    clickDelete(e){
        const cardId = e.target.dataset.id;
        ajax.delete(urls.deleteById(cardId));
    
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListener(this.clickAdd.bind(this))
        this.getData();
    }
}
