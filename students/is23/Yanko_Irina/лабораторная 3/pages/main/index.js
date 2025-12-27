import { DogCardComponent } from "../../components/dog-card/index.js";

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
                image: "./imeges/labrador_retriever.jpg",
                fullDescription: "Лабрадор-ретривер - одна из самых популярных пород собак в мире. Известны своим дружелюбным характером, интеллектом и любовью к воде.",
                size: "Крупный",
                weight: "25-36 кг",
                lifespan: "10-12 лет",
                temperament: "Дружелюбный, активный, outgoing"
            },
            {
                id: 2,
                breed: "Немецкая овчарка",
                shortDescription: "Умная и преданная служебная собака",
                image: "./imeges/оvcharka.jpg",
                fullDescription: "Немецкие овчарки известны своей преданностью, интеллектом и рабочими качествами. Часто используются в полиции и армии.",
                size: "Крупный",
                weight: "22-40 кг",
                lifespan: "9-13 лет",
                temperament: "Уверенный, умный, внимательный"
            },
            {
                id: 3,
                breed: "Золотистый ретривер",
                shortDescription: "Ласковая и терпеливая собака-компаньон",
                image: "./imeges/golden_retriever.jpg",
                fullDescription: "Золотистые ретриверы - прекрасные семейные собаки с золотым характером. Отлично ладят с детьми и другими животными.",
                size: "Крупный",
                weight: "25-34 кг",
                lifespan: "10-12 лет",
                temperament: "Дружелюбный, надежный, доверчивый"
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
            <div class="container">
                <h1 class="my-4">Популярные породы собак</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
            `
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const app = document.getElementById('root');
        
        import('../product/index.js').then(module => {
            const ProductPage = module.ProductPage;
            const productPage = new ProductPage(app, cardId);
            productPage.render();
        });
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