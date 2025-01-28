import {ajax} from "../../modules/ajax.js";
import {groupId} from "../../modules/consts.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
const url = 'http://localhost:8000';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>

            `
        )
    }
    
    async getData() {
        try {
            const data = await ajax.get(`${url}/getConversations/${groupId}`);
            this.renderData(data.response.items);
        } catch (error) {
            console.error("Ошибка получения данных:", error);
        }
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.getData()
    }

    renderData(items) {
        items.forEach((item, index) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render({ ...item, id: index }, this.clickCard.bind(this), this.deleteChat.bind(this));
            
        });
    }    

    clickCard(event) {
        const chatId = event.target.dataset.id; 
        
        if (chatId) { 
            const productPage = new ProductPage(this.parent, chatId);
            productPage.render(); 
        }
    }

    async deleteChat(event) {
        const chatId = event.target.dataset.id;
        if (chatId) {
            try {
                await ajax.post(`${url}/deleteConversation/${chatId}/${groupId}`);
                await this.render();
            } catch (error) {
                console.error("Ошибка при удалении чата:", error);
            }
        }
        
    }
}
    