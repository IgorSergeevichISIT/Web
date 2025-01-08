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
                src: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_659cd9b23c349263cd2120b6_659cdcf6f79ef86dc1e641f5/scale_1200",
                title: "Кредит",
                text: "Лучшая процентная ставка по кредиту!"
            },
            {
                id: 2,
                src: "https://avatars.dzeninfra.ru/get-zen_doc/3680683/pub_5f0f2e8cea359268f6b96ebe_5f0f49a8a6fd3b1dc0cc7de9/scale_1200",
                title: "Счет",
                text: "Лучшее решения для ваших накоплений"
            },
            {
                id: 3,
                src: "https://avatars.mds.yandex.net/i?id=f90e0b72d5040ca4946339ded9b0e66e_l-5233580-images-thumbs&n=13",
                title: "Ипотека",
                text: "Лучшие процентны по ипотеке"
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