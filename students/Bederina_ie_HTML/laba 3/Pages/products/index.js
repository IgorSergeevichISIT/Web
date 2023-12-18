import {ProductComponent} from "../../Components/products/index.js";
import {BackButtonComponent} from "../../Components/back-button/index.js";
import {MainPage} from "../main/index.js";
export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        return {
            id: 1,
            src: "http://ic.pics.livejournal.com/nickfw/11997630/15586/15586_original.jpg",
            title: `Бульменный магазин можно найти по адрессу бульменная 31`,
            text: "Ответственность за продукиы не несем <br /> чебупели не продаем <br /> почти вкусно <br />"
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"><div/>

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