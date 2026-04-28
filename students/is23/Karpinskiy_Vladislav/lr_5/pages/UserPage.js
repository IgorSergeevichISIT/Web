import {urls} from "/Web-lab/lr_5/modules/urls.js"
import {ProductComponent} from "/Web-lab/lr_5/components/ProductComponent.js"
import {BackButtonComponent} from "/Web-lab/lr_5/components/BackButtonComponent.js"

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

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.pageRoot = document.getElementById('user-container')

        // кнопка назад
        const back = new BackButtonComponent(document.getElementById('back-button'))
        back.render(this.clickBack.bind(this))

        // загрузка пользователя
        this.getData()
    }

    async getData() {
    try {
        this.pageRoot.innerHTML = '<p>Загрузка...</p>'

        const response = await fetch(
            urls.getUserInfo(this.id)
        )

        const data = await response.json()

        this.renderData(data.response[0])

    } catch (error) {
        console.error(error)
        this.pageRoot.innerHTML = '<p>Ошибка загрузки</p>'
    }
    }

    renderData(item) {
        const user = new ProductComponent(this.pageRoot)
        user.render(item)
    }

    clickBack() {
        window.location.hash = '#main'
    }
}