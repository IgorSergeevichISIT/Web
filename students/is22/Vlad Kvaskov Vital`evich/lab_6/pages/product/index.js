import {ajax} from "../../modules/ajax.js";
import {groupId} from "../../modules/consts.js";
import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
const url = 'http://localhost:8000';


export class ProductPage {
    constructor(parent, chatId) {
        this.parent = parent;
        this.chatId = chatId;
    }

    getData() {
        ajax.get(`${url}/getConversationsById/${this.chatId}/${groupId}`).then(data => {
            if (data?.length) {
                this.renderData(data);}
        });
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
    
    renderData(chatInfo) {
        const product = new ProductComponent(this.pageRoot);
        product.render(chatInfo[0]); 
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