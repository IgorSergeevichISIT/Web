import { buildVkUrl } from "../../modules/urls.js";
import { urls } from "../../modules/urls.js";
import ProductComponent from "../../components/product/index.js";
import BackButtonComponent from "../../components/back-button/index.js";

class UserPage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = null;
        this.id = null;
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div class="cyber-header">
                    <h1>Краткий обзор участника группы </h1>
                </div>
                <div id="user-container"></div>
                <div id="back-button-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.pageRoot = document.getElementById('user-container');
        const backButtonContainer = document.getElementById('back-button-container');

        const hash = window.location.hash;
        const match = hash.match(/#user\/(\d+)/);
        if (!match) {
            this.pageRoot.innerHTML = '<p class="text-danger">Пользователь не найден</p>';
            return;
        }
        this.id = match[1];

        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(() => {
            window.location.hash = '#main';
        });

        this.loadUserData();
    }

    async loadUserData() {
    try {
        const { url, params } = buildVkUrl('users.get', {
            user_ids: this.id,
            fields: 'photo_400,city,country,sex,bdate,status,followers_count,verified,online'
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(params)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data?.response?.length > 0) {
            this.renderData(data.response[0]);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        this.pageRoot.innerHTML = `<p class="text-danger">Ошибка: ${error.message}</p>`;
    }
}

    renderData(user) {
        const product = new ProductComponent(this.pageRoot);
        product.render(user);
    }
}

export default UserPage;