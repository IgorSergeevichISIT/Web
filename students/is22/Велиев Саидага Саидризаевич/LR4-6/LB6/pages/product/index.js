import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js"; // Теперь используем ajax

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    async getData() {
        ajax.get(`/user/${this.id}`, (data) => {
            this.renderData(data.response);
        });
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page"></div>
        `;
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
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}
