import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, data, id) {
        this.parent = parent;
        this.data = data;
        this.id = id;
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        const product = this.data.find(item => item.id == this.id);
        if (!product) {
            this.parent.innerHTML = `<p>Продукт не найден.</p>`;
            return;
        }

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const backButtonHTML = `
            <button class="btn btn-secondary" id="back-button">Назад</button>
        `;
        this.pageRoot.insertAdjacentHTML("beforeend", backButtonHTML);

        const productHTML = `
            <div>
                <img src="${product.src}" alt="${product.title}" style="max-width: 20%;">
                <h2>${product.title}</h2>
                <p>${product.text}</p>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML("beforeend", productHTML);

        document.getElementById("back-button").addEventListener("click", this.clickBack.bind(this));
    }
}
