import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {ProductCardComponent} from "../../components/ProductCardComponent.js";
import {FilterComponent} from "../../components/FilterComponent.js";

export class IndexPage {
    constructor(parent) {
        this.parent = parent;
        this.currentFilter = 'all';
    }

    getHTML() {
        return (
            `
            <div class="container py-4">
                <!-- Заголовок -->
                <div class="row justify-content-center mb-4">
                    <div class="col-12 col-md-8 col-lg-6 text-center">
                        <h1 class="display-5 mb-3">Участники группы</h1>
                        <p class="lead text-muted">Используйте фильтр для отображения разных категорий участников</p>
                    </div>
                </div>
                
                <!-- Компонент фильтра -->
                <div class="row justify-content-center mb-4">
                    <div class="col-12 col-md-8 col-lg-6">
                        <div id="filter-container"></div>
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
            `
        )
    }

    clickCard(userId) {
        window.location.href = `/#product/${userId}`
    }

    renderData(items) {
        console.log('=== renderData() начал выполнение ===')
        console.log('Количество items:', items ? items.length : 'items is null/undefined')
        console.log('Items:', items)
        
        const container = document.getElementById('cards-container')
        const countElement = document.getElementById('members-count')
        
        container.innerHTML = ''
        
        if (!items || items.length === 0) {
            console.log('Нет участников для отображения')
            container.innerHTML = `
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="alert alert-info text-center shadow">
                        <i class="bi bi-info-circle-fill fs-4"></i>
                        <h5 class="mt-2">Нет участников для отображения</h5>
                        <p>Попробуйте выбрать другой фильтр или обновить страницу</p>
                    </div>
                </div>
            `;
            countElement.textContent = '0';
            return;
        }
        
        console.log(`Отрисовываем ${items.length} участников`)
        countElement.textContent = items.length;
        
        items.forEach((item, index) => {
            console.log(`Участник ${index}:`, item)
            
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center';
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.clickCard.bind(this));
            
            container.appendChild(col);
        });
    }

    getData() {
        const container = document.getElementById('cards-container')
        const countElement = document.getElementById('members-count')
        
        console.log('=== getData() начал выполнение ===')
        console.log('Текущий фильтр:', this.currentFilter)
        console.log('ID группы:', groupId)
        
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="d-flex flex-column align-items-center">
                    <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <h5>Загрузка участников...</h5>
                    <p class="text-muted">Фильтр: ${this.getFilterName(this.currentFilter)}</p>
                </div>
            </div>
        `;
        
        countElement.textContent = '0';
        
        // Формируем URL и логируем его
        const url = urls.getGroupMembers(groupId, this.currentFilter);
        console.log('URL запроса:', url)
        
        ajax.post(url, (data) => {
            console.log('=== Ответ от API получен ===')
            console.log('Структура ответа:', data)
            console.log('Есть ли ошибка?', data.error)
            console.log('Есть ли response?', data.response)
            console.log('Есть ли items?', data.response ? data.response.items : 'нет response')
            
            if (data.error) {
                console.error('Ошибка VK API:', data.error)
                
                container.innerHTML = `
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="alert alert-danger text-center shadow">
                            <i class="bi bi-exclamation-triangle-fill fs-4"></i>
                            <h5 class="mt-2">Ошибка загрузки</h5>
                            <p><strong>Код:</strong> ${data.error.error_code}</p>
                            <p><strong>Сообщение:</strong> ${data.error.error_msg}</p>
                            <p><strong>Фильтр:</strong> ${this.currentFilter}</p>
                            <button class="btn btn-outline-primary mt-2" onclick="location.reload()">
                                <i class="bi bi-arrow-clockwise"></i> Обновить страницу
                            </button>
                        </div>
                    </div>
                `;
                return;
            }
            
            if (data.response && data.response.items) {
                console.log(`Загружено ${data.response.items.length} участников`)
                this.renderData(data.response.items)
            } else {
                console.error('Неожиданная структура данных:', data)
                container.innerHTML = `
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="alert alert-warning text-center">
                            <h5>Данные не получены</h5>
                            <p>Структура ответа не содержит items</p>
                            <pre class="text-start">${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                `;
            }
        })
    }

    setupFilter() {
        const filterContainer = document.getElementById('filter-container');
        const filterComponent = new FilterComponent(
            filterContainer,
            this.currentFilter,
            (newFilter) => {
                this.currentFilter = newFilter;
                this.getData();
            }
        );
        filterComponent.render();
    }

    getFilterName(filter) {
        const names = {
            'all': 'Все участники',
            'friends': 'Друзья',
            'managers': 'Руководители'
        };
        return names[filter] || filter;
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        this.setupFilter()
        this.getData()
    }
}