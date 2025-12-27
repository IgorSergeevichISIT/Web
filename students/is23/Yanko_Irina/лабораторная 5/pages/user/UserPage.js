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
                    <div id="back-button-container" class="mb-4"></div>
                    
                    <div class="text-center mb-5">
                        <h1 class="display-5 mb-3">Профиль пользователя</h1>
                        <p class="text-muted">Подробная информация об участнике</p>
                    </div>
                    
                    <div id="user-container" class="d-flex justify-content-center"></div>
                </div>
            </div>
        </div>
        `;
    }

    clickBack() {
        window.location.hash = "";
    }

    // Асинхронный метод с fetch
    async getData() {
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
        
        try {
            const url = urls.getUserInfo(this.id);
            console.log('Fetch запрос пользователя:', url);
            
            // Используем ajax.post для обратной совместимости
            ajax.post(url, (data) => {
                this.handleUserResponse(data, container);
            });
            
        } catch (error) {
            console.error('Ошибка в getData:', error);
            this.showError(container, 'Ошибка загрузки профиля');
        }
    }
    
    handleUserResponse(data, container) {
        if (data.error) {
            this.showError(container, `Ошибка API: ${data.error.error_msg || data.error}`);
            return;
        }
        
        if (data.response && data.response.length > 0) {
            this.renderData(data.response[0]);
        } else {
            this.showError(container, 'Пользователь не найден');
        }
    }
    
    showError(container, message) {
        container.innerHTML = `
            <div class="alert alert-danger text-center">
                <h5>Ошибка</h5>
                <p>${message}</p>
                <button class="btn btn-outline-primary mt-2" onclick="window.location.hash = ''">
                    <i class="bi bi-arrow-left"></i> Назад
                </button>
            </div>
        `;
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