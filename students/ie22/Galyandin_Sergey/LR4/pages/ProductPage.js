import { Product } from "../components/Product.js"
import { BackButton } from "../components/BackButton.js"
import { HomePage } from "./HomePage.js"
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, cardId, filter) {
        this.parent = parent
        this.cardId = cardId
        this.filter = filter
    }

    getData() {
        // return {
        //     id: this.card.id,
        //     src: this.card.src,
        //     title: this.card.title,
        //     text: this.card.text
        // }

        ajax.post(urls.getUserInfo(this.cardId), (data) => {
            this.renderData(data.response)
        })
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
        const homePage = new HomePage(this.parent, this.filter)
        homePage.render()
    }

    renderData(item) {
        const product = new Product(this.pageRoot)
        product.render(item[0])
    }

    render() {
        this.parent.innerHTML = ''
        this.filter.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButton(this.pageRoot)
        backButton.addListeners(this.clickBack.bind(this))
        
        this.getData()
        

    }
}