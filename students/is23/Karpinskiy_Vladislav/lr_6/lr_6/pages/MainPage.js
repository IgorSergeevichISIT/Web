import { ProductCardComponent } from "../../components/ProductCardComponent.js"
import { FilterComponent } from "../../components/FilterComponent.js"

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.pageRoot = null
        this.filter = 'all'
    }

    getHTML() {
        return `
            <div class="container">

                <h1 class="my-3 text-white">Участники группы</h1>

                <div class="card p-3 mb-3">
                    <input id="name-input" class="form-control mb-2" placeholder="Имя">
                    <input id="desc-input" class="form-control mb-2" placeholder="Описание">

                    <select id="avatar-select" class="form-select mb-2">
                        <option value="">Выбери аватар</option>
                        <option value="./assets/ava1.jpg">Аватар 1</option>
                        <option value="./assets/ava2.jpg">Аватар 2</option>
                        <option value="./assets/ava3.jpg">Аватар 3</option>
                        <option value="./assets/ava4.jpg">Аватар 4</option>
                    </select>

                    <button id="add-btn" class="btn btn-success">Добавить</button>
                </div>

                <div class="card p-3 mb-3">
                    <div id="filter-container" class="d-flex gap-2 flex-wrap"></div>
                </div>

                <div id="cards-container"
                     class="d-flex flex-wrap gap-3 justify-content-center">
                </div>

            </div>
        `
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        this.pageRoot = document.getElementById('cards-container')

        document.getElementById('add-btn').addEventListener('click', () => {
            const title = document.getElementById('name-input').value
            const text = document.getElementById('desc-input').value
            const selectedAvatar = document.getElementById('avatar-select').value

            if (!title || !text) {
                alert('Заполни поля')
                return
            }

            const src = selectedAvatar || `https://i.pravatar.cc/300?random=${Math.random()}`

            fetch('http://localhost:8000/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, text, src })
            })
            .then(() => {
                this.getData()
            })
        })

        const filterContainer = document.getElementById('filter-container')
        const filter = new FilterComponent(filterContainer)
        filter.render(this.changeFilter.bind(this))

        this.getData()
    }

    getData() {
        fetch('http://localhost:8000/api/items')
            .then(res => res.json())
            .then(data => {
                this.renderData(data)
            })
    }

    renderData(items) {
        this.pageRoot.innerHTML = ''

        if (!items.length) {
            this.pageRoot.innerHTML = '<p class="text-muted">Нет данных</p>'
            return
        }

        items.forEach(item => {
            const card = new ProductCardComponent(this.pageRoot)
            card.render(
                item,
                this.clickCard.bind(this),
                this.deleteCard.bind(this)
            )
        })
    }

    clickCard(id) {
        window.location.hash = `#user/${id}`
    }

    deleteCard(id) {
        fetch(`http://localhost:8000/api/items/${id}`, {
            method: 'DELETE'
        })
        .then(() => this.getData())
    }

    changeFilter(value) {
        this.filter = value
        this.pageRoot.innerHTML = '<p>Загрузка...</p>'
        this.getData()
    }
}