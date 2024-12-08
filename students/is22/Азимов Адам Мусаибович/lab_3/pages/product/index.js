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
            src: `https://thumbs.dreamstime.com/b/set-pixel-images-vegetables-fruit-green-background-fruits-seamless-pattern-vector-illustration-89038539.jpg`,
            title: `Содержание витаминов`,
            text: "<p><strong>Томат:</strong> Богат витамином C, A, K и антиоксидантом ликопином.</p><p><strong>Апельсин:</strong> Чемпион по витамину C, содержит также витамины A, B1, B9.</p><p><strong>Тыква:</strong> Источник витамина A, C, E и группы B (B2, B3, B6).</p>"
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