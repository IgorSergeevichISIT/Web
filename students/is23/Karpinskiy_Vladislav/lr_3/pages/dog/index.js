import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { DogDetailComponent } from "../../components/dog-detail/index.js";

export class DogPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    render() {
        // очищаем контейнер
       this.parent.innerHTML = `
            <header class="d-flex justify-content-between align-items-center mb-4">
                <h1>${this.data.name}</h1>
                <button id="home-btn" class="btn btn-secondary">Домой</button>
            </header>
            <div id="dog-page" class="d-flex flex-column align-items-center mt-4"></div>
        `;
        document.getElementById("home-btn").addEventListener("click", () => {
            new MainPage(this.parent).render();
        });

        const pageRoot = document.getElementById("dog-page");

        const back = new BackButtonComponent(pageRoot);
        back.render(() => {
            new MainPage(this.parent).render();
        });

        const detail = new DogDetailComponent(pageRoot);
        detail.render(this.data);
    }
}