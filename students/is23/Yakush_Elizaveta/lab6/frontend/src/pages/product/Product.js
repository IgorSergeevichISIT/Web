import { ProductComponent } from "../../components/product1/product1";
import { MainPage } from "../main";
export class ProductPage {
    parent;
    constructor(parent) {
        this.parent = parent;
    }
    render(user) {
        this.parent.innerHTML = "";
        // кнопка назад
        const backButton = document.createElement("button");
        backButton.textContent = "Назад";
        backButton.className = "btn btn-primary mb-3";
        backButton.onclick = () => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        };
        this.parent.appendChild(backButton);
        // корень страницы пользователя
        const root = document.createElement("div");
        root.id = "product-page";
        this.parent.appendChild(root);
        // рендерим пользователя
        const product = new ProductComponent(root);
        product.render(user);
    }
}
