import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
        const a = ["<br>Кредиты - лучшие проценты</br><br>Ипотека - лучшие процент</br><br>Счета - лучшие проценты</br>  ","asdasdasdasd"]
    }
   
    getData() {
        return {
            id: 1,
            src: `https://avatars.mds.yandex.net/i?id=4ee1bc2167219944054de6cd12efbfd7_l-5301271-images-thumbs&n=13`,
            title: `Самый лучший финансовый партнер`,
            text: "<br>Кредиты - лучшие проценты</br><br>Ипотека - лучшие процент</br>"
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div class="product" id="product-page"></div>
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