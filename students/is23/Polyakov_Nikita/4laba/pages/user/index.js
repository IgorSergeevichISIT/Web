import { ajax } from "../../modules/ajax.js";
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
                <h1>Профиль пользователя</h1>
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

        // Получаем ID из хеша
        const hash = window.location.hash;
        const match = hash.match(/#user\/(\d+)/);
        if (!match) {
            this.pageRoot.innerHTML = '<p class="text-danger">Пользователь не найден</p>';
            return;
        }
        this.id = match[1];

        // Кнопка "Назад"
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(() => {
            window.location.hash = '#main';
        });

        // Загружаем данные
        ajax.post(urls.getUserInfo(this.id), (data) => {
            if (data?.response?.length > 0) {
                // ✅ Передаём ПЕРВЫЙ элемент массива!
                this.renderData(data.response[0]);
            } else {
                this.pageRoot.innerHTML = '<p class="text-danger">Пользователь не найден</p>';
            }
        });
    }

    renderData(user) {
        const product = new ProductComponent(this.pageRoot);
        product.render(user); // ← user — это объект, не массив!
    }
}

export default UserPage;