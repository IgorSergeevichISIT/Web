import { Product } from "../components/Product.js"
import { BackButton } from "../components/BackButton.js"
import { HomePage } from "./HomePage.js"

export class ProductPage {
    constructor(parent, card) {
        this.parent = parent
        this.card = card
    }

    getData() {
        return {
            id: this.card.id,
            src: this.card.src,
            title: this.card.title,
            text: this.card.text
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
        const homePage = new HomePage(this.parent)
        homePage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButton(this.pageRoot)
        backButton.addListeners(this.clickBack.bind(this))
    
        const data = this.getData()
        const stock = new Product(this.pageRoot)
        stock.render(data)
        

    }
}