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
            src: "https://bogatyr.club/uploads/posts/2023-03/1679080228_bogatyr-club-p-fioletovie-dengi-foni-pinterest-19.jpg",
            title: `Лучший инвестр мира`,
            text: "6000 ₽ / Вебинар по финансам <br /> 3500 ₽ / Прогноз на январь 2024<br /> 1500 ₽ / 5 советов для бизнеса <br /> Удобное время для связи: с 8:00 до 23:00 <br /> Тел: 88005553535"
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