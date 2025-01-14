import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.members = [];
        this.chats = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="flex flex-col bg-blue-500 min-h-screen p-4">
                <div id="member-list" class="member-list flex flex-wrap justify-center"></div>
                <div id="chat-section" class="chat-section mt-4">
                    <div id="chat-list" class="chat-list flex flex-wrap mt-2"></div>
                </div>
            </div>`;
    }

    getData() {
    ajax.post(urls.getGroupMembers(groupId), (data) => {
        this.members = data.response.items;
        this.renderMembers(this.members);
    });

    ajax.post(urls.getGroupChats(groupId), (data) => {
        console.log(data);
        if (data.response && data.response.items) {
            console.log(data.response.items);
            this.chats = data.response.items;
            this.renderChats(this.chats);
        } else {
            console.error('Не удалось получить чаты', data);
        }
    });
}

    renderMembers(items) {
        const memberList = document.getElementById('member-list');
        memberList.innerHTML = '';

        items.forEach((item) => {
            const productCard = new ProductCardComponent(memberList);
            productCard.render(item, this.clickMemberCard.bind(this));
        });
    }

    renderChats(items) {
        const chatList = document.getElementById('chat-list');
        chatList.innerHTML = '';
    
        items.forEach((item) => {
            const chatCard = document.createElement('div');
            chatCard.className = 'chat-card';
            chatCard.dataset.id = item.conversation.peer.id;
    
            const chatTitle = document.createElement('span');
            chatTitle.innerText = item.conversation.chat_settings.title || "Без названия";
            chatTitle.style.fontSize = '18px';
    
            chatCard.appendChild(chatTitle);
    
            chatList.appendChild(chatCard);
        });
    }

    clickMemberCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
    }
}

