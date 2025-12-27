import {ProductComponent} from "../../components/product/index.js";
import {MainPage} from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            if (data.response) {
                this.renderData(data.response[0])
            } else {
                console.error('Ошибка получения данных пользователя:', data.error)
                this.renderError()
            }
        })
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item)
    }
    
    renderError() {
        this.pageRoot.insertAdjacentHTML('beforeend',
            '<div class="alert alert-danger">Ошибка загрузки данных пользователя</div>'
        );
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (`
            <div id="product-page">
                <div class="mb-3">
                    <button id="back-button" class="btn btn-outline-secondary" style="color: white; border-color: white; margin: 10px;">← Назад к списку</button>
                </div>
                <h2 class="mb-4" style="text-align: center; color: white">Профиль пользователя</h2>
            </div>
        `)
    }
    
    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById('back-button').addEventListener('click', this.clickBack.bind(this));
        
        this.getData()
    }
}