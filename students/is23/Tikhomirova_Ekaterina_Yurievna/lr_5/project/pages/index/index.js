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
        return `
        <div class="container py-4">
            <!-- Заголовок -->
            <div class="row justify-content-center mb-4">
                <div class="col-12 col-md-8 col-lg-6 text-center">
                    <h1 class="display-5 mb-3">Участники группы</h1>
                    <p class="lead text-muted">Используйте фильтр для отображения разных категорий участников</p>
                    <p class="text-muted small"><i class="bi bi-lightning-charge"></i> Используется fetch API</p>
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
        `;
    }

    clickCard(userId) {
        window.location.href = `/#product/${userId}`;
    }

    renderData(items) {
        console.log('=== renderData() начал выполнение ===');
        console.log('Количество items:', items ? items.length : 'items is null/undefined');
        
        const container = document.getElementById('cards-container');
        const countElement = document.getElementById('members-count');
        
        container.innerHTML = '';
        
        if (!items || items.length === 0) {
            console.log('Нет участников для отображения');
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
        
        console.log(`Отрисовываем ${items.length} участников`);
        countElement.textContent = items.length;
        
        items.forEach((item, index) => {
            console.log(`Участник ${index}:`, item);
            
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center';
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.clickCard.bind(this));
            
            container.appendChild(col);
        });
    }

    getData() {
        const container = document.getElementById('cards-container');
        const countElement = document.getElementById('members-count');
        
        console.log('=== getData() начал выполнение ===');
        console.log('Текущий фильтр:', this.currentFilter);
        console.log('ID группы:', groupId);
        
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="d-flex flex-column align-items-center">
                    <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <h5>Загрузка участников...</h5>
                    <p class="text-muted">Фильтр: ${this.getFilterName(this.currentFilter)}</p>
                    <p class="text-muted small">Используется fetch API</p>
                </div>
            </div>
        `;
        
        countElement.textContent = '0';
        
        // Формируем URL и логируем его
        const url = urls.getGroupMembers(groupId, this.currentFilter);
        console.log('URL запроса:', url);
        
        ajax.post(url, (data) => {
            console.log('=== Ответ от fetch API получен ===');
            console.log('Структура ответа:', data);
            
            if (data.error) {
                console.error('Ошибка VK API через fetch:', data.error);
                
                let errorMessage = data.error.error_msg;
                let isCorsError = data.error.error_code === 0;
                
                container.innerHTML = `
                    <div class="col-12 col-md-10 col-lg-8">
                        <div class="alert ${isCorsError ? 'alert-warning' : 'alert-danger'}">
                            <h5><i class="bi bi-exclamation-triangle"></i> ${isCorsError ? 'CORS Ограничение' : 'Ошибка API'}</h5>
                            <p><strong>Технология:</strong> <span class="badge bg-primary">Fetch API</span></p>
                            <p><strong>Код:</strong> ${data.error.error_code}</p>
                            <p><strong>Сообщение:</strong></p>
                            <pre class="bg-dark text-light p-3 rounded">${errorMessage}</pre>
                            
                            ${isCorsError ? `
                            <div class="mt-3">
                                <h6><i class="bi bi-tools"></i> Решение для лабораторной работы:</h6>
                                <div class="alert alert-info">
                                    <p class="mb-2"><strong>Для демонстрации работы fetch API:</strong></p>
                                    <ol class="mb-0">
                                        <li>Установите расширение "CORS Unblock" для браузера</li>
                                        <li>Включите расширение (синяя иконка)</li>
                                        <li>Перезагрузите эту страницу</li>
                                    </ol>
                                </div>
                                
                                <div class="mt-3">
                                    <p class="mb-2"><strong>Альтернатива для отчета:</strong></p>
                                    <p>В коде показана работа с fetch, async/await, Promise и обработка CORS ошибок.</p>
                                    <button class="btn btn-outline-primary btn-sm" id="show-fetch-demo">
                                        <i class="bi bi-eye"></i> Показать демонстрацию работы fetch
                                    </button>
                                </div>
                            </div>
                            ` : ''}
                            
                            <div class="mt-3">
                                <button class="btn btn-primary" onclick="location.reload()">
                                    <i class="bi bi-arrow-clockwise"></i> Перезагрузить
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                if (isCorsError) {
                    // Кнопка для демонстрации работы fetch с тестовыми данными
                    setTimeout(() => {
                        const demoBtn = document.getElementById('show-fetch-demo');
                        if (demoBtn) {
                            demoBtn.addEventListener('click', () => {
                                this.showFetchDemo();
                            });
                        }
                    }, 100);
                }
                
                return;
            }
            
            // Успешный ответ
            if (data.response && data.response.items) {
                console.log(`✅ Успешно загружено ${data.response.items.length} участников через fetch`);
                
                // Показываем что использовался fetch
                const methodUsed = url.includes('callback=') ? 'JSONP (через fetch обход)' : 'Fetch API';
                
                container.innerHTML = `
                    <div class="col-12 text-center mb-3">
                        <div class="alert alert-success">
                            <i class="bi bi-check-circle"></i> Данные загружены через <strong>${methodUsed}</strong>
                            <span class="badge bg-secondary ms-2">Fetch</span>
                        </div>
                    </div>
                `;
                
                setTimeout(() => {
                    this.renderData(data.response.items);
                }, 500);
                
            } else {
                console.error('Неожиданный формат данных через fetch:', data);
                container.innerHTML = `
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="alert alert-secondary">
                            <h5>Неверный формат данных</h5>
                            <p>Fetch вернул данные в неожиданном формате</p>
                            <pre>${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                `;
            }
        });
    }

    // Метод для демонстрации работы fetch (для отчета)
    showFetchDemo() {
        const container = document.getElementById('cards-container');
        
        container.innerHTML = `
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0"><i class="bi bi-code-slash"></i> Демонстрация работы Fetch API</h5>
                    </div>
                    <div class="card-body">
                        <h6>Код из modules/ajax.js:</h6>
                        <pre class="bg-dark text-light p-3 rounded"><code>async post(url, callback) {
    console.log('Fetch запрос к VK API');
    
    try {
        // Используем современный fetch с async/await
        const response = await fetch(url, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        
        const data = await response.json();
        console.log('✅ Fetch успешен!');
        callback(data);
        
    } catch (error) {
        console.error('❌ Ошибка fetch:', error);
        // Обработка ошибок...
    }
}</code></pre>
                        
                        <h6 class="mt-4">Принцип работы:</h6>
                        <ul>
                            <li>Используется <strong>Promise</strong> через <strong>async/await</strong></li>
                            <li><strong>Fetch API</strong> вместо устаревшего XMLHttpRequest</li>
                            <li>Обработка ошибок через <strong>try/catch</strong></li>
                            <li>Поддержка <strong>CORS</strong> через JSONP fallback</li>
                        </ul>
                        
                        <div class="alert alert-info mt-3">
                            <h6><i class="bi bi-info-circle"></i> Для реальной работы:</h6>
                            <p>Установите CORS расширение или используйте backend proxy</p>
                        </div>
                        
                        <button class="btn btn-secondary" onclick="this.closest('.col-12').remove()">
                            <i class="bi bi-x-circle"></i> Закрыть демонстрацию
                        </button>
                    </div>
                </div>
            </div>
        `;
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
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        this.setupFilter();
        this.getData();
    }
}