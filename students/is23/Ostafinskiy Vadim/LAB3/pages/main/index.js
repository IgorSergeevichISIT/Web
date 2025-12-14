import { DogCardComponent } from "../../components/dog-card/index.js";
import { DogPage } from "../dog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                breed: "Лабрадор-ретривер",
                shortDescription: "Дружелюбная и энергичная семейная собака",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/1200px-Labrador_on_Quantock_%282175262184%29.jpg",
                description: "Лабрадор-ретривер - одна из самых популярных пород собак в мире.",
                characteristics: "Рост: 54-57 см, Вес: 25-36 кг"
            },
            {
                id: 2,
                breed: "Немецкая овчарка",
                shortDescription: "Умная и преданная служебная собака",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg/1200px-German_Shepherd_-_DSC_0346_%2810096362833%29.jpg",
                description: "Немецкая овчарка известна своим интеллектом и рабочими качествами.",
                characteristics: "Рост: 55-65 см, Вес: 22-40 кг"
            },
            {
                id: 3,
                breed: "Золотистый ретривер",
                shortDescription: "Добродушная и терпеливая собака-компаньон",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Golden_Retriever_Carlos_%2810581910556%29.jpg/1200px-Golden_Retriever_Carlos_%2810581910556%29.jpg",
                description: "Золотистый ретривер - идеальная семейная собака с золотым характером.",
                characteristics: "Рост: 51-61 см, Вес: 25-34 кг"
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Популярные породы собак</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const dogPage = new DogPage(this.parent, cardId);
        dogPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const dogCard = new DogCardComponent(this.pageRoot);
            dogCard.render(item, this.clickCard.bind(this));
        });
    }
}