import {ajax} from "/Web-lab/lr_4/modules/ajax.js"
import {urls} from "/Web-lab/lr_4/modules/urls.js"
import {ProductComponent} from "/Web-lab/lr_4/components/ProductComponent.js"
import {BackButtonComponent} from "/Web-lab/lr_4/components/BackButtonComponent.js"

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

        const back = new BackButtonComponent(document.getElementById('back-button'))
        back.render(this.clickBack.bind(this))

        // загрузка пользователя
        this.getData()
    }

    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            this.renderData(data.response[0])
        })
    }

    renderData(item) {
        const user = new ProductComponent(this.pageRoot)
        user.render(item)
    }

    clickBack() {
        window.location.hash = '#main'
    }
}