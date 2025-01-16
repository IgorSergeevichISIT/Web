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
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
        
    getData() {
        return [
            {
                id: 1,
                src: "https://assets.avtocod.ru/storage/2017-10/19/mceclip0(12).jpg",
                title: "Кредит",
                text: "Больно только по началу!"
            },
            {
                id: 2,
                src: "https://lawstrust.com/sites/default/files/353789_888066_1341823573.jpg",
                title: "Счет",
                text: "Всегда в минусе - Ну и что?"
            },
            {
                id: 3,
                src: "https://img.avaho.ru/rsz/upload/articles/e861475d88ed27f201524b4f68ab3774.w850_strict.jpg",
                title: "Ипотека",
                text: "Продай души всех родных"
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