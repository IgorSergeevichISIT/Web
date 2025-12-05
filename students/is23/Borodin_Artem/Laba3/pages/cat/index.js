import { BackButtonComponent } from '../../components/back-button/index.js';
import { AlertComponent } from '../../components/alert/index.js';
import { MainPage } from '../main/index.js'; // Импортируем MainPage для доступа к данным

export class CatPage {
    constructor(parent, catId) {
        this.parent = parent;
        this.catId = catId;
    }

    /**
     * Получает данные о конкретной кошке по ID
     * @returns {Object} объект с данными кошки
     */
    getCatData() {
        // Используем статические данные из MainPage для согласованности
        const cats = MainPage.catsData || []; 
        return cats.find(cat => cat.id === parseInt(this.catId));
    }

    /**
     * Получает корневой элемент страницы
     * @returns {HTMLElement} элемент с ID 'cat-page'
     */
    get pageRoot() {
        return document.getElementById('cat-page');
    }

    /**
     * Генерирует HTML для страницы кошки
     * @param {Object} data - данные кошки
     * @returns {string} HTML страницы
     */
    getHTML(data) {
        if (!data) {
            return `
                <div class="container mt-5">
                    <div id="alerts-container"></div>
                    <div id="cat-page">
                        <div class="alert alert-danger" role="alert">
                            Кошка не найдена!
                        </div>
	                </div>
	            </div>
	        `;
        }

	        return `
	            <div id="alerts-container"></div>
	            <div id="cat-page" class="mt-4">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${data.image}" class="img-fluid rounded shadow" alt="${data.name}">
                        </div>
                        <div class="col-md-6">
                            <h2>${data.name}</h2>
                            <p class="text-muted"><strong>Порода:</strong> ${data.breed}</p>
                            <hr>
                            <p><strong>Описание:</strong></p>
                            <p>${data.description}</p>
                            <hr>
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Возраст:</strong> ${data.age} лет</p>
                                    <p><strong>Цвет:</strong> ${data.color}</p>
                                    <p><strong>Вес:</strong> ${data.weight}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Характер:</strong></p>
                                    <p>${data.personality}</p>
                                </div>
                            </div>
                            <hr>
                            <button id="favorite-button" class="btn btn-success btn-lg" type="button">
                                ❤️ Добавить в избранное
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Обработчик клика по кнопке "Добавить в избранное"
     */
    clickFavorite() {
        const alertsContainer = document.getElementById('alerts-container');
        const alert = new AlertComponent(alertsContainer);
        alert.render({
            type: 'success',
            message: `${this.getCatData().name} добавлена в избранное! ❤️`,
            id: `alert-${Date.now()}`
        });
    }

    
	     
	    clickBack() {
	        const mainPage = new MainPage(this.parent);
	        mainPage.render();
	    }
	
	    
    render() {
        this.parent.innerHTML = '';
        
        const catData = this.getCatData();
        
        const html = this.getHTML(catData);
        this.parent.insertAdjacentHTML('beforeend', html);

        
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        
        const favoriteButton = document.getElementById('favorite-button');
        if (favoriteButton) {
            favoriteButton.addEventListener('click', this.clickFavorite.bind(this));
        }
    }
}
