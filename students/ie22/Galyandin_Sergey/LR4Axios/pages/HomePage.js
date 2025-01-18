import { ProductCard } from "../components/ProductCard.js";
import { ProductPage } from "./ProductPage.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import { filterByAdmins, filterByFriends } from "../modules/consts.js";

export class HomePage {
    constructor(parent, filter) {
        this.parent = parent;
        this.filter = filter
    }

    getHTML() {
        return (
            `
                <div class="card" style="width: 750px;">
                    <div class="card-body d-flex justify-content-center">
                        <button class="btn btn-primary m-3" id="filterByFriends"">Фильтр по друзьям</button>
                        <button class="btn btn-primary m-3" id="filterByAdmins"">Фильтр по админам</button>
                        <button class="btn btn-primary m-3" id="clearFilters"">Удалить фильтры</button>
                    </div>
                </div>
            `
        )
    }

    async getData(filter) {
        const data = await ajax.get(urls.getGroupMembers(groupId, filter))
        this.renderData(data.response.items)
    }

    filterByFriends() {
        this.getData(filterByFriends)
    }

    filterByAdmins() {
        this.getData(filterByAdmins)
    }

    clearFilters() {
        this.getData("")
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId, this.filter)
        productPage.render()
    }

    renderData(items) {
        this.parent.innerHTML = ''
        const productCard = new ProductCard(this.parent)
        productCard.render(items, this.clickCard.bind(this))
    }
    
    async render() {
        this.parent.innerHTML = ''
        this.filter.innerHTML = ''
        document.getElementById('')
        const html = this.getHTML()
        this.filter.insertAdjacentHTML('beforeend', html)
        const filterByFriends = document.getElementById("filterByFriends")
        const filterByAdmins = document.getElementById("filterByAdmins")
        const clearFilters = document.getElementById("clearFilters")
        filterByFriends.addEventListener('click', () => {
            this.filterByFriends()
        })
        filterByAdmins.addEventListener('click', () => {
            this.filterByAdmins()
        })
        clearFilters.addEventListener('click', () => {
            this.clearFilters()
        })
        await this.getData("")
    }
}