import { ProductCard } from "../components/ProductCard.js";
import { ProductPage } from "./ProductPage.js";
import {ajax} from "../modules/ajax.js";
import {urls} from "../modules/urls.js";
import { Filter } from "../components/filter.js";

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.data = {}
    }

    async getData(url) {
        const data = await ajax.get(url)
        this.data = data
        this.renderData(data)
    }
    
    clickCard(cardId) {
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    async filterByFrinds() {
        await this.getData(urls.getFriendsFromApi())
        this.renderData(this.data)
        const filter = new Filter(this.parent)
        filter.render(this.filterByFrinds.bind(this), this.filterByAdmins.bind(this), this.clearFilters.bind(this))
    }

    async filterByAdmins() {
        await this.getData(urls.getAdminsFromApi())
        this.renderData(this.data)
        const filter = new Filter(this.parent)
        filter.render(this.filterByFrinds.bind(this), this.filterByAdmins.bind(this), this.clearFilters.bind(this))
    }

    async clearFilters() {
        await this.render()
    }

    renderData(items) {
        this.parent.innerHTML = ''
        const productCard = new ProductCard(this.parent)
        productCard.render(items, this.clickCard.bind(this))

    }
    
    async render() {
        this.parent.innerHTML = ''
        await this.getData(urls.getGroupMembersFromApi())
        const filter = new Filter(this.parent)
        filter.render(this.filterByFrinds.bind(this), this.filterByAdmins.bind(this), this.clearFilters.bind(this))
    }
}