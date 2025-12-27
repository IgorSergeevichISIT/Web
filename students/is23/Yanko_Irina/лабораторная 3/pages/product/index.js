import { DogDetailsComponent } from "../../components/dog-details/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const allData = {
            1: {
                id: 1,
                breed: "Лабрадор-ретривер",
                image: "./imeges/labrador_retriever.jpg",
                fullDescription: "Лабрадор-ретривер - одна из самых популярных пород собак в мире. Известны своим дружелюбным характером, интеллектом и любовью к воде.",
                size: "Крупный",
                weight: "25-36 кг",
                lifespan: "10-12 лет",
                temperament: "Дружелюбный, активный, общительный",
                careTips: "Регулярные физические нагрузки, сбалансированное питание, уход за шерстью",
                training: "Легко поддаются дрессировке, отлично работают за похвалу"
            },
            2: {
                id: 2,
                breed: "Немецкая овчарка",
                image: "./imeges/оvcharka.jpg",
                fullDescription: "Немецкие овчарки известны своей преданностью, интеллектом и рабочими качествами. Часто используются в полиции и армии.",
                size: "Крупный",
                weight: "22-40 кг",
                lifespan: "9-13 лет",
                temperament: "Уверенный, умный, внимательный",
                careTips: "Активные тренировки, умственная нагрузка, регулярный уход за шерстью",
                training: "Требуют последовательной дрессировки, отличные рабочие качества"
            },
            3: {
                id: 3,
                breed: "Золотистый ретривер",
                image: "./imeges/golden_retriever.jpg",
                fullDescription: "Золотистые ретриверы - прекрасные семейные собаки с золотым характером. Отлично ладят с детьми и другими животными.",
                size: "Крупный",
                weight: "25-34 кг",
                lifespan: "10-12 лет",
                temperament: "Дружелюбный, надежный, доверчивый",
                careTips: "Регулярные прогулки, уход за длинной шерстью, внимание к ушам",
                training: "Очень восприимчивы к обучению, работают за похвалу и лакомства"
            }
        };
        
        return allData[this.id] || allData[1];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
            <div class="container">
                <div id="product-page"></div>
            </div>
            `
        );
    }

    clickBack() {
        const app = document.getElementById('root');
        
        import('../main/index.js').then(module => {
            const MainPage = module.MainPage;
            const mainPage = new MainPage(app);
            mainPage.render();
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        
        const dogDetails = new DogDetailsComponent(this.pageRoot);
        dogDetails.render(data);

        // Добавляем аккордеон с дополнительной информацией
        const accordionData = [
            {
                id: "care",
                title: "Уход и содержание",
                content: data.careTips
            },
            {
                id: "training",
                title: "Дрессировка и воспитание",
                content: data.training
            },
            {
                id: "health",
                title: "Здоровье",
                content: `Продолжительность жизни: ${data.lifespan}. Рекомендуются регулярные визиты к ветеринару и профилактические осмотры.`
            }
        ];

        accordionData.forEach(item => {
            const accordion = new AccordionComponent(this.pageRoot);
            accordion.render(item);
        });
    }
}