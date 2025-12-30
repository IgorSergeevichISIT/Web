// pages/user/UserPage.js
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {ProductComponent} from "../../components/ProductComponent.js";
import {BackButtonComponent} from "../../components/BackButtonComponent.js";

export class UserPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getHTML() {
        return `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <!-- Кнопка назад -->
                    <div id="back-button-container" class="mb-4"></div>
                    
                    <!-- Заголовок -->
                    <div class="text-center mb-5">
                        <h1 class="display-5 mb-3">Профиль пользователя</h1>
                        <p class="text-muted">Подробная информация об участнике</p>
                    </div>
                    
                    <!-- Карточка пользователя -->
                    <div id="user-container" class="d-flex justify-content-center"></div>
                </div>
            </div>
        </div>
        `;
    }

    clickBack() {
        window.location.hash = "";
    }

    getData() {
        const container = document.getElementById('user-container');
        
        container.innerHTML = `
            <div class="text-center w-100">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <p class="mt-3">Загрузка профиля...</p>
                <p class="text-muted small">ID: ${this.id}</p>
            </div>
        `;
        
        // Используем метод users.get
        const url = urls.getUserInfo(this.id);
        console.log('Запрос пользователя:', url);
        
        ajax.post(url, (data) => {
            console.log('Ответ от users.get:', data);
            
            if (data.error) {
                container.innerHTML = `
                    <div class="alert alert-danger text-center">
                        <h5>Ошибка загрузки</h5>
                        <p>${data.error.error_msg || data.error}</p>
                        <button class="btn btn-outline-primary mt-2" onclick="window.location.hash = ''">
                            <i class="bi bi-arrow-left"></i> Назад
                        </button>
                    </div>
                `;
                return;
            }
            
            if (data.response && data.response.length > 0) {
                this.renderData(data.response[0]);
            } else {
                container.innerHTML = `
                    <div class="alert alert-warning text-center">
                        <h5>Пользователь не найден</h5>
                        <p>ID: ${this.id}</p>
                        <button class="btn btn-outline-primary mt-2" onclick="window.location.hash = ''">
                            <i class="bi bi-arrow-left"></i> Назад
                        </button>
                    </div>
                `;
            }
        });
    }

    renderData(userData) {
        const container = document.getElementById('user-container');
        const product = new ProductComponent(container);
        product.render(userData);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.clickBack.bind(this));
        
        this.getData();
    }
}