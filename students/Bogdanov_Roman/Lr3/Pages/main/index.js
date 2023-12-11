import {ProductCardComponent} from "../../Components/product-card/index.js";

import {ProductPage} from "../products/index.js";

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
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    getData() {
        return [
            {
                id: 1,
                src: "https://cdn.fotosklad.ru/unsafe/fit-in/785x465/10dab206edfc4e6990ecf3a4ed58c5f5/image.jpg",
                title: "АКЦИЯ ТОЛЬКО В СУББОТУ" ,
                text: "Фото в студии первые 30 мин бесплатно"
            },
            {
                id: 2,
                src: "https://cdn.fotosklad.ru/unsafe/fit-in/785x465/cc11b0c6bec14cb7b8ffc0aa1cd52884/image.jpg",
                title: "СРЕДА БЛИЗКО",
                text: "Съемка свадьб 50% выгода"
            },
            {
                id: 3,
                src: "https://cdn.fotosklad.ru/unsafe/fit-in/785x465/df0d8d36097d4534a1306b21f8aa4be1/image.jpg",
                title: "КАЖДЫЙ ПОНЕДЕЛЬНИК",
                text: "Фото животных, первые фото бесплатно"
            },
            {
            id: 3,
                src: "https://cdn.fotosklad.ru/unsafe/fit-in/785x465/afb8885818934ddb8bc25d9c45743c6f/image.jpg",
                title: "КАЖДЫЙ ПОНЕДЕЛЬНИК",
                text: "Архитектурная съемка"
            }
        ]
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
    
}