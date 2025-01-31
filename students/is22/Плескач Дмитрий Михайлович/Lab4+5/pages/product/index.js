import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    fetchData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            if (data.response && data.response.length > 0) {
                this.renderData(data.response[0]);
            } else {
                console.error("Не удалось получить данные о пользователе", data);
            }
        });
    }

    renderData(userInfo) {
        const html = `
            <div class="user-page">
                <h1>${userInfo.first_name} ${userInfo.last_name}</h1>
                <img src="${userInfo.photo_400_orig}" alt="Фото пользователя" />
                <p>ID: ${userInfo.id}</p>
            </div>
        `;
        this.pageRoot.innerHTML = html;

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        this.fetchData();
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
}
