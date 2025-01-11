import {AccordionComponent} from "../../components/accordion/index.js";
import {ProductPage} from "../dog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [
            {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqK_ZKftgEmksGgFOH0UaMMDH2K8nqcTtnFfP5n4CkYtfOq6MNF0lIUwzxG6fUkVVmKjY&usqp=CAU",
                title: "Лабрадор",
                text: "Лабрадоры — это дружелюбные и энергичные собаки."
            },
            {
                id: 2,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_H2y6rADuxtY7IWcwZFSNg1-CDt9pAFquw&s",
                title: "Бульдог",
                text: "Бульдоги известны своей сильной и мужественной природой."
            },
            {
                id: 3,
                src: "https://masterpiecer-images.s3.yandex.net/5f8ee61a569ed0d:upscaled ",
                title: "Пудель",
                text: "Пудели — умные и энергичные собаки, часто участвующие в конкурсах."
            },
            
        ];
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, this.data, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(this.data, this.clickCard.bind(this));
    }
}
