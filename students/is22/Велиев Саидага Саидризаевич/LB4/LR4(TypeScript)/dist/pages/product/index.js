import { ProductComponent } from "../../components/product";
import { BackButtonComponent } from "../../components/back-button";
import { MainPage } from "../main";
import { ajax } from "../../modules/ajax";
import { urls } from "../../modules/urls";
export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }
    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            this.renderData(data.response);
        });
    }
    get pageRoot() {
        return document.getElementById('product-page');
    }
    getHTML() {
        return `<div id="product-page"></div>`;
    }
    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item[0]);
    }
    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
        this.getData();
    }
}
