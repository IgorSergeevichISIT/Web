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
                src: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663685470_36-mykaleidoscope-ru-p-ribnie-delikatesi-krasivo-41.jpg",
                title: "ЛЮБИМАЯ ПЯТНИЧНАЯ АКЦИЯ",                
                text: "В ПЯТНИЦУ СКИДКИ НА МОРЕПРОДУКТЫ ДО 30%"
                
                
            } ,
            {
                id: 2,
                src: "https://fikiwiki.com/uploads/posts/2022-02/1644967550_44-fikiwiki-com-p-khleb-krasivie-kartinki-57.jpg",
                title: "Хлебобулочный кайф",
                text: "обычная продажа хлеба"
            },
            {
                id: 3,
                src: "https://k1news.ru/wp-content/uploads/2020/05/83de9f586987c4487a3d7a7fb099e31d-scaled.jpg",
                title: "ДЕНЬ ЗЕЛЕНОГО МОЛОКА",
                text: "ЕСЛИ УСПЕЕТЕ В СРЕДУ С 9:00 ДО 9:01 - СКИДКА 1%!"
            },
            {
                id: 4,
                src: "https://klike.net/uploads/posts/2023-03/1677643931_3-17.jpg",
                title: "МАКАРОННЫЙ ДЭЖДЬ",
                text: "ТУР ПО ПРИГОТОВЛЕНИЮ МАКАРОН В ЭТУ СУББОТУ"
                
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