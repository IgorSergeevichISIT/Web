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
                src: "https://bogatyr.club/uploads/posts/2023-03/1679080200_bogatyr-club-p-fioletovie-dengi-foni-pinterest-2.jpg",
                title: "АКЦИЯ ТОЛЬКО В ЧЕТВЕРГ" ,
                text: "Вебинары по финансам 45% выгода"
            },
            {
                id: 2,
                src: "https://bogatyr.club/uploads/posts/2023-03/1679080237_bogatyr-club-p-fioletovie-dengi-foni-pinterest-5.jpg",
                title: "ВРЕМЯ ДЕНЕГ В ПЯТНИЦУ",
                text: "Прогнозы на января!"
            },
            {
                id: 3,
                src: "https://bogatyr.club/uploads/posts/2023-03/1679080209_bogatyr-club-p-fioletovie-dengi-foni-pinterest-9.jpg",
                title: "ДЕНЕЖНЫЙ ВТОРНИК",
                text: "Дельные советы по видению бизнеса"
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