import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner" id="carousel-inner">
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#main-page" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: rgba(130, 130, 130);"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#main-page" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: rgba(130, 130, 130);"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            `
        )
    }
    
    getData() {
        return [
            {
                id: 1,
                src: "./photos/2_23.jpg",
                title: "Английский язык",
                text: "Репетиторы по английскому языку!"
            },
            {
                id: 2,
                src: "./photos/2_24.jpg",
                title: "Математика",
                text: "Репетиторы по математике!"
            },
            {
                id: 3,
                src: "./photos/2_25.jpg",
                title: "География",
                text: "Репетиторы по географии!"
            },
        ]
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        const data = this.getData();
        const carouselInner = document.getElementById('carousel-inner');
    
        data.forEach((item, index) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            const cardHTML = productCard.getHTML(item, this.clickCard.bind(this));
            
            // Создаем элемент carousel-item
            const carouselItemHTML = `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    ${cardHTML}
                </div>
            `;
            
            carouselInner.insertAdjacentHTML('beforeend', carouselItemHTML);
        });

        const buttons = carouselInner.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.clickCard.bind(this));
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        const cardTitle = e.target.dataset.title;
        const cardSrc = e.target.dataset.src;
        const productPage = new ProductPage(this.parent, cardId, cardTitle, cardSrc)
        productPage.render()
    }
}