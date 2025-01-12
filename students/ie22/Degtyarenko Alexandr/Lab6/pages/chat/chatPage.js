import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { MainPage } from "../main/index.js";

export class ChatPage {
    constructor(parent, chatId) {
        this.parent = parent;
        this.chatId = chatId;
    }

    getHTML(chatInfo) {
        return `
            <div id="chat-page" class="chat-page" style="background: linear-gradient(to right,rgb(233, 191, 38), #9013fe); color: white; padding: 20px;">
                <h1>Сообщения</h1>
                <div id="messages-container" class="messages-container"></div>
                <button id="back-button" class="btn btn-primary">Назад</button>
            </div>
        `;
    }

    getData() {
        ajax.post(urls.getChatInfo(this.chatId), (data) => {
            console.log(data);
            if (data.response && data.response.items && data.response.items.length > 0) {
                this.renderData(data.response.items[0]);
            } else {
                console.error('Чат не найден', data);
                this.renderError();
            }
        });
    }

    getMessages() {
        ajax.post(urls.getChatMessages(this.chatId), (data) => {
            console.log(data);
            if (data.response && data.response.items) {
                this.renderMessages(data.response.items);
            } else {
                console.error('Не удалось загрузить сообщения', data);
            }
        });
    }

    renderMessages(messages) {
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';

        messages.forEach((msg) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';

            const messageDate = new Date(msg.date * 1000).toLocaleString();
            
            if (msg.text) {
                messageElement.innerText = `${msg.from_id < 0 ? 'Группа' : 'Пользователь'} (${messageDate}): ${msg.text}`;
            } else if (msg.attachments && msg.attachments.length > 0) {
                msg.attachments.forEach(attachment => {
                    if (attachment.type === 'photo') {
                        const img = document.createElement('img');
                        img.src = attachment.photo.sizes[0].url;
                        img.alt = 'Изображение';
                        img.style.maxWidth = '100%';
                        img.style.width = '250px';
                        messageElement.appendChild(img);
                    }
                });
            }

            messagesContainer.appendChild(messageElement);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    renderData(chatInfo) {
        const html = this.getHTML(chatInfo);
        this.parent.innerHTML = html;
    
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.goBackToMainPage();
            });
        } else {
            console.error('Кнопка "Назад" не найдена');
        }
        this.getMessages();
    }
    

    renderError() {
        this.parent.innerHTML = `
            <div class="error-message">
                <h2>Ошибка</h2>
                <p>Не удалось загрузить информацию о чате. Пожалуйста, попробуйте позже.</p>
                <button id="back-button" class="btn btn-secondary">Назад</button>
            </div>
        `;
        
        document.getElementById('back-button').addEventListener('click', () => {
            this.goBackToMainPage();
        });
    }

    goBackToMainPage() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.getData();
    }
}
