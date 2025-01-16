import { ProductCard } from "../components/ProductCard.js";
import { ProductPage } from "./ProductPage.js";
import {ajax} from "../modules/ajax.js";
import {urls} from "../modules/urls.js";
// import {filterByFriends, filterByAdmins} from "../modules/consts.js";
// import {groupId} from "../modules/consts.js";
import { Filter } from "../components/filter.js";

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.data = {}
    }

    async getData() {
        return await ajax.get(urls.getStocks())
    }
    
    async clickCard(cardId) {
        // const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        await productPage.render()
    }

    async deleteCard(id) {
        await ajax.delete(urls.deleteStock(id), {id: id})
    }

    async addCard(title, text) {
        const body = {
            title: title.value,
            text: text.value,
            src: "../assets/cat1.jpg"
        }
        await ajax.post(urls.getStocks(), body)
    }

    renderData(items) {
        this.parent.innerHTML = ''
        const productCard = new ProductCard(this.parent)
        productCard.render(items, this.clickCard.bind(this), this.deleteCard.bind(this))
    }
    
    async render() {
        this.parent.innerHTML = ''
        this.data = await this.getData("")
        console.log(this.data)
        this.renderData(this.data)
        const filter = new Filter(this.parent)
        filter.render(this.addCard.bind(this))
    }
}