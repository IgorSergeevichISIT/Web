import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        return [
            {
                id: 1,
                name: "Свежие яблоки", 
                price: "150 руб/кг",
                image: "https://plus.unsplash.com/premium_photo-1673487564182-00d71c6d5d7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
                shortDescription: "Сочные красные яблоки сорта 'Гала'",
                badges: ["новинка", "хит", "акция"]
            },
            {
                id: 2,
                name: "Молоко Простоквашино",
                price: "89 руб", 
                image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D",
                shortDescription: "Пастеризованное молоко 3.2% жирности",
                badges: ["хит", "акция"]
            },
            {
                id: 3,
                name: "Хлеб Бородинский",
                price: "65 руб",
                image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWR8ZW58MHx8MHx8fDA%3D", 
                shortDescription: "Традиционный ржаной хлеб с тмином",
                badges: ["новинка", "популярное"]
            },
            {
                id: 4,
                name: "Куриное филе",
                price: "320 руб/кг",
                image: "https://images.unsplash.com/photo-1587332278432-18346cbdc8ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGZpbGV0fGVufDB8fDB8fHww",
                shortDescription: "Свежее куриное филе от проверенных поставщиков", 
                badges: ["акция", "рекомендуем"]
            },
            {
                id: 5,
                name: "Сыр Пармезан",
                price: "890 руб/кг",
                image: "https://images.unsplash.com/photo-1552767057-3f9d6591a6e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlfGVufDB8fDB8fHww",
                shortDescription: "Итальянский твердый сыр выдержанный 24 месяца",
                badges: ["премиум", "хит"]
            },
            {
                id: 6,
                name: "Свежая клубника",
                price: "290 руб/кг", 
                image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D",
                shortDescription: "Сладкая клубника из Краснодарского края",
                badges: ["сезонное", "новинка"]
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container">
                <div class="text-center my-4">
                    <h1 class="display-4 text-success">🍎 Магазин продуктов</h1>
                    <p class="lead text-muted">Свежие продукты каждый день с доставкой на дом</p>
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        const productCard = new ProductCardComponent(this.pageRoot);
        
        data.forEach((item) => {
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}