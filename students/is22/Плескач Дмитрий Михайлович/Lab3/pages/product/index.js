import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";


export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    

    getData() {
        return {
            id: 1,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOgRDnXNqSB86JQn7dc7lEgciM7X0Gyeemog&s",
            title: `Шаурма у Ашота`,
            text: "<br>Только сегодня!</br><br> При покупки 2 шаурмы получите 3-ю по ЦЕНЕ 1!</br><br>Также призаказе КОМБО 'Вай мама кто это!' травка в айран бесплатно!</br>",
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    
        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)
    }
}