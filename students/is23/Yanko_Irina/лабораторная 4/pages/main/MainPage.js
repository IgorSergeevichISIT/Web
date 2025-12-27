// pages/main/MainPage.js
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {ProductCardComponent} from "../../components/ProductCardComponent.js";
import {SortComponent} from "../../components/SortComponent.js"; // Изменили импорт

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentSort = 'id_asc'; // Добавляем состояние сортировки
    }

    getHTML() {
        return `
        <div class="container py-4">
            <!-- Заголовок -->
            <div class="row justify-content-center mb-4">
                <div class="col-12 col-md-8 col-lg-6 text-center">
                    <h1 class="display-5 mb-3">Участники группы</h1>
                    <p class="lead text-muted">Используйте сортировку для изменения порядка отображения</p>
                </div>
            </div>
            
            <!-- Компонент сортировки -->
            <div class="row justify-content-center mb-4">
                <div class="col-12 col-md-8 col-lg-6">
                    <div id="sort-container"></div>
                </div>
            </div>
            
            <!-- Карточки участников -->
            <div id="cards-container" class="row justify-content-center g-4"></div>
            
            <!-- Счетчик -->
            <div class="row justify-content-center mt-4">
                <div class="col-12 text-center">
                    <div class="badge bg-primary fs-6 p-3">
                        <i class="bi bi-people me-2"></i>
                        Найдено: <span id="members-count" class="fw-bold">0</span> участников
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    clickCard(userId) {
        window.location.hash = `product/${userId}`;
    }

    // Добавляем метод для настройки сортировки
    setupSort() {
        const sortContainer = document.getElementById('sort-container');
        const sortComponent = new SortComponent(
            sortContainer,
            this.currentSort,
            (newSort) => {
                this.currentSort = newSort;
                this.getData(); // Перезагружаем данные с новой сортировкой
            }
        );
        sortComponent.render();
    }

    getData() {
        const container = document.getElementById('cards-container');
        const countElement = document.getElementById('members-count');
        
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="d-flex flex-column align-items-center">
                    <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <h5>Загрузка участников...</h5>
                    <p class="text-muted">Сортировка: ${this.getSortName(this.currentSort)}</p>
                </div>
            </div>
        `;
        
        // Используем метод getGroupMembers с параметром sort
        const url = urls.getGroupMembers(groupId, this.currentSort);
        console.log('URL запроса с сортировкой:', url);
        
        ajax.post(url, (data) => {
            if (data.error) {
                container.innerHTML = `
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="alert alert-danger text-center shadow">
                            <i class="bi bi-exclamation-triangle-fill fs-4"></i>
                            <h5 class="mt-2">Ошибка загрузки</h5>
                            <p>${data.error.error_msg}</p>
                        </div>
                    </div>
                `;
                return;
            }
            
            if (data.response && data.response.items) {
                this.renderData(data.response.items);
            } else {
                container.innerHTML = `
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="alert alert-warning text-center">
                            <h5>Данные не получены</h5>
                            <p>Участники не найдены</p>
                        </div>
                    </div>
                `;
            }
        });
    }

    renderData(items) {
        const container = document.getElementById('cards-container');
        const countElement = document.getElementById('members-count');
        
        container.innerHTML = '';
        
        if (!items || items.length === 0) {
            container.innerHTML = `
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="alert alert-info text-center shadow">
                        <i class="bi bi-info-circle-fill fs-4"></i>
                        <h5 class="mt-2">Нет участников</h5>
                        <p>В группе нет участников</p>
                    </div>
                </div>
            `;
            countElement.textContent = '0';
            return;
        }
        
        countElement.textContent = items.length;
        
        items.forEach((item) => {
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center';
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.clickCard.bind(this));
            
            container.appendChild(col);
        });
    }

    // Метод для получения названия сортировки
    getSortName(sort) {
        const names = {
            'id_asc': 'ID (возрастание)',
            'id_desc': 'ID (убывание)',
            'time_asc': 'Время добавления (старые)',
            'time_desc': 'Время добавления (новые)'
        };
        return names[sort] || sort;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.setupSort(); // Настраиваем сортировку вместо фильтра
        this.getData();
    }
}