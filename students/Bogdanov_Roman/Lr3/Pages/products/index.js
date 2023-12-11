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
            src: "https://markspace.center/upload/iblock/c79/c79c7d1c6bb1489de76087dd70d51b23.jpg",
            title: `Лучший фотогораф мира!`,
            text: "12000 ₽ / час Архитектурный фотограф <br /> 3000 ₽ / час  Свадебный фотограф<br /> 2500 ₽ / час Фотограф животных <br /> Удобное время для связи: с 8:00 до 23:00 <br /> Тел: 88005553535"
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