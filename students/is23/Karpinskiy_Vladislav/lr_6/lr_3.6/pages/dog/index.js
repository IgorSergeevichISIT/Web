import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { DogDetailComponent } from "../../components/dog-detail/index.js";

export class DogPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    render() {
        this.parent.innerHTML = `
            <div class="container py-4">

                <header class="d-flex justify-content-between align-items-center mb-4">

                    <button id="back-btn" class="btn btn-primary">
                        ← Назад
                    </button>

                    <h2 class="mb-0 text-center flex-grow-1">
                        ${this.data.name}
                    </h2>

                    <button id="home-btn" class="btn btn-secondary">
                        Домой
                    </button>

                </header>

                <div class="d-flex flex-column align-items-center text-center">

                    <img 
                        src="${this.data.img}" 
                        class="img-fluid rounded shadow mb-4"
                        style="max-width: 550px;"
                    >

                    <p class="fs-5" style="max-width: 700px;">
                        ${this.data.full}
                    </p>

                </div>

            </div>
        `;

        // Назад
        document.getElementById("back-btn").addEventListener("click", () => {
            new MainPage(this.parent).render();
        });

        // Домой
        document.getElementById("home-btn").addEventListener("click", () => {
            new MainPage(this.parent).render();
        });
    }
}