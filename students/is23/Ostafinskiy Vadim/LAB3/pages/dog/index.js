import { AccordionComponent } from "../../components/accordion/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class DogPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const dogs = {
            1: {
                id: 1,
                breed: "Лабрадор-ретривер",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/1200px-Labrador_on_Quantock_%282175262184%29.jpg",
                description: "Лабрадор-ретривер - одна из самых популярных пород собак в мире. Известны своим дружелюбным характером, интеллектом и энергичностью.",
                characteristics: "Рост: 54-57 см, Вес: 25-36 кг, Продолжительность жизни: 10-12 лет",
                temperament: "Дружелюбный, активный, общительный",
                care: "Требует регулярных физических нагрузок и ухода за шерстью"
            },
            2: {
                id: 2,
                breed: "Немецкая овчарка",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg/1200px-German_Shepherd_-_DSC_0346_%2810096362833%29.jpg",
                description: "Немецкая овчарка известна своим интеллектом и рабочими качествами. Широко используется в полиции, армии и как собака-поводырь.",
                characteristics: "Рост: 55-65 см, Вес: 22-40 кг, Продолжительность жизни: 9-13 лет",
                temperament: "Умная, преданная, уверенная в себе",
                care: "Нуждается в серьезной физической и умственной нагрузке"
            },
            3: {
                id: 3,
                breed: "Золотистый ретривер",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Golden_Retriever_Carlos_%2810581910556%29.jpg/1200px-Golden_Retriever_Carlos_%2810581910556%29.jpg",
                description: "Золотистый ретривер - идеальная семейная собака с золотым характером. Отлично ладит с детьми и другими животными.",
                characteristics: "Рост: 51-61 см, Вес: 25-34 кг, Продолжительность жизни: 10-12 лет",
                temperament: "Добродушный, терпеливый, надежный",
                care: "Регулярный уход за длинной шерстью и умеренные нагрузки"
            }
        };
        return dogs[this.id];
    }

    get pageRoot() {
        return document.getElementById('dog-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="dog-page"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const headerHTML = `
            <h1 class="text-center mb-4">${data.breed}</h1>
            <div class="text-center mb-4">
                <img src="${data.image}" alt="${data.breed}" class="img-fluid rounded" style="max-height: 400px;">
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', headerHTML);

        const accordionData = [
            {
                id: 1,
                title: "📝 Описание породы",
                content: data.description
            },
            {
                id: 2,
                title: "📊 Характеристики",
                content: data.characteristics
            },
            {
                id: 3,
                title: "😊 Темперамент",
                content: data.temperament
            },
            {
                id: 4,
                title: "💅 Уход и содержание",
                content: data.care
            }
        ];

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(accordionData);
    }
}