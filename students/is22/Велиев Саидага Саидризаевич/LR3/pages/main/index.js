import {AccordionComponent} from "../../components/accordion/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [
            {
                id: 1,
                src: "https://10dogs.ru/images/porody/labrador-retriver/labrador-retriver.jpg",
                title: "Лабрадор-ретривер",
                text: "Лабрадор-ретривер — собака среднего или крупного размера, весом 25–36 кг, известная своим дружелюбным, энергичным и терпеливым характером. Эти собаки отлично подходят для семей с детьми, любят активные игры, хорошо поддаются дрессировке и становятся прекрасными спутниками для людей, ведущих активный образ жизни."
            },
            {
                id: 2,
                src: "https://vetonline.pro/uploads/blog/abf632be5b308ea6e86500ea839d1ac4.jpg",
                title: "Йоркширский терьер",
                text: "Йоркширский терьер — миниатюрная порода весом 1,5–3 кг, которая отличается преданностью, любопытством и активностью. Несмотря на свои скромные размеры, йорки обладают храбростью, энергичностью и прекрасно адаптируются к жизни в квартире, оставаясь замечательными компаньонами."
            },
            {
                id: 3,
                src: "https://pet-guide.ru/wp-content/uploads/2022/06/shiba-792x445.jpg",
                title: "Шиба-ину",
                text: "Шиба-ину — собака небольшого или среднего размера, весом 8–12 кг, известная своей независимостью, умом и чистоплотностью. Эти собаки часто сравниваются с кошками за их любовь к чистоте, бдительность и спокойный нрав, однако при этом они могут быть упрямыми, поэтому обучение требует терпения и последовательности."
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
