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
                src: "img/mejnava.png",
                title: "АКЦИЯ ТОЛЬКО НА ЭТОЙ НЕДЕЛЕ" ,
                text: "Кошки от заводчиков совершенно с 50% скидкой"
            },
            {
                id: 2,
                src: "img/scale_1200.jpg",
                title: "ХОЧЕШЬ СОБАКУ?",
                text: "Лучше заведи котика, они прикольные"
            },
            {
                id: 3,
                src: "img/756723921758895.jpg",
                title: "НЕТ ДЕНЕГ НА ПОРОДИСТОГО КОТА?",
                text: "Сходи в питомник, там они тоже тебя ждут"
            },
            
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