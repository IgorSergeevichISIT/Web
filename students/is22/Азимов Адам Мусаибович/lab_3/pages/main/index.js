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
                src: "https://thumbs.dreamstime.com/b/vector-pixel-art-tomato-isolated-cartoon-114949046.jpg",
                title: "Томатик",
                text: "Томат — это ягода, которая притворяется овощем"
            },
            {
                id: 2,
                src: "https://thumbs.dreamstime.com/b/сокращение-водных-ресурсов-искусства-пикселей-вектора-в-изоляции-185317594.jpg",
                title: "Арбуз",
                text: "Арбуз — это зеленый чемодан с сахарной начинко"
            },
            {
                id: 3,
                src: "https://avatars.mds.yandex.net/i?id=66789df2f1f9778fa512481cce1039d6_l-5405548-images-thumbs&n=13",
                title: "Тыква",
                text: "Тыква — это арбуз, который решил стать лампой. "
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