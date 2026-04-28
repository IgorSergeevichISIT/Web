import {ProductComponent} from "../../components/ProductComponent.js"
import {BackButtonComponent} from "../../components/BackButtonComponent.js"

export class UserPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
        this.pageRoot = null
    }

    getHTML() {
        return `
            <div class="container">

                <h1 class="my-3">Пользователь</h1>

                <div id="back-button" class="mb-3"></div>

                <div id="user-container"></div>

            </div>
        `
    }

    render() {
        this.parent.innerHTML = ''

        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        this.pageRoot = document.getElementById('user-container')

        const back = new BackButtonComponent(
            document.getElementById('back-button')
        )
        back.render(this.clickBack.bind(this))

        this.getData()
    }

    getData() {
        fetch(`http://localhost:8000/api/items/${this.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('User not found')
                }
                return res.json()
            })
            .then(data => {
                this.renderData(data)
            })
            .catch(err => {
                this.pageRoot.innerHTML = `
                    <div class="alert alert-danger">
                        Ошибка загрузки пользователя
                    </div>
                `
                console.error(err)
            })
    }

    renderData(item) {
        if (!item) {
            this.pageRoot.innerHTML = `
                <p class="text-muted">Пользователь не найден</p>
            `
            return
        }

        const user = new ProductComponent(this.pageRoot)
        user.render(item)
    }

    clickBack() {
        window.location.hash = '#main'
    }
}