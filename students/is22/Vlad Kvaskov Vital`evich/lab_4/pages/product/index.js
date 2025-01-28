import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";


export class ProductPage {
    constructor(parent, id , chat) {
        this.parent = parent
        this.id = id
        this.group = groupId;
        this.chat = chat
    }

    getData() {
        ajax.get(urls.getConversationsById(this.chat , groupId), (data) => {
            this.renderData(data.response.items)
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
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item[0])
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
        
        this.getData()
    }
}