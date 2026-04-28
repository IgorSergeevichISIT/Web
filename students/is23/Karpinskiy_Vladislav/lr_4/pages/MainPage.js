import {ajax} from "/Web-lab/lr_4/modules/ajax.js"
import {urls} from "/Web-lab/lr_4/modules/urls.js"
import {groupId} from "/Web-lab/lr_4/modules/consts.js"
import {ProductCardComponent} from "/Web-lab/lr_4/components/ProductCardComponent.js"
import {FilterComponent} from "/Web-lab/lr_4/components/FilterComponent.js"

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.pageRoot = null
        this.filter = 'friends'
    }

    getHTML() {
    return `
        <div class="container">
            <h1 class="my-3">Участники группы</h1>

            <div id="filter-container" class="mb-3"></div>

            <div id="cards-container"
                 class="d-flex flex-wrap gap-3">
            </div>
        </div>
    `
    }

    render() {
        this.parent.innerHTML = ''



        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.pageRoot = document.getElementById('cards-container')

        const filterContainer = document.getElementById('filter-container')
        const filter = new FilterComponent(filterContainer)
        filter.render(this.changeFilter.bind(this))

        this.getData()
    }

    getData() {
        this.pageRoot.innerHTML = '<p class="text-white">Загрузка...</p>'

        ajax.post(urls.getGroupMembers(groupId, this.filter), (data) => {
            console.log("VK FULL RESPONSE:", data)

            if (data?.error) {
                console.error("VK ERROR:", data.error)

                this.pageRoot.innerHTML = `
                    <div class="text-white">
                        <h3>Ошибка VK API</h3>
                        <pre>${JSON.stringify(data.error, null, 2)}</pre>
                    </div>
                `
                return
            }

            const items = data?.response?.items

            if (!items || !items.length) {
                this.pageRoot.innerHTML = "<p class='text-white'>Нет данных</p>"
                return
            }

            this.renderData(items)
        })
    }

    renderData(items) {
        this.pageRoot.innerHTML = ''

        if (!items.length) {
            this.pageRoot.innerHTML = '<p>Нет пользователей</p>'
            return
        }

        items.forEach((item) => {
            const card = new ProductCardComponent(this.pageRoot)
            card.render(item, this.clickCard.bind(this))
        })
    }

    clickCard(id) {
        window.location.hash = `#user/${id}`
    }

    changeFilter(value) {
        this.filter = value

        this.pageRoot.innerHTML = '<p>Загрузка...</p>'

        this.getData()
    }
}