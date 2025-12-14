import { AccordionComponent } from "../../components/accordion/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class DogPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }


    get pageRoot() {
        return document.getElementById('dog-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="dog-page">
                    <div class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Загрузка...</span>
                        </div>
                        <p class="mt-2">Загрузка информации о собаке...</p>
                    </div>
                </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = await window.dogsAPI.getDogById(this.id);
        
        if (!data) {
            this.pageRoot.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Ошибка!</h4>
                    <p>Не удалось загрузить информацию о собаке с ID ${this.id}</p>
                    <button class="btn btn-secondary" id="back-btn">
                        ← Вернуться к списку
                    </button>
                </div>
            `;
            
            document.getElementById('back-btn').addEventListener('click', () => {
                this.clickBack();
            });
            return;
        }

        this.pageRoot.innerHTML = '';
        
        // Кнопка назад
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const headerHTML = `
            <div class="text-center mb-4">
                <h1>${data.breed}</h1>
                <p class="lead text-muted">${data.shortDescription}</p>
                <img src="${data.image}" 
                     alt="${data.breed}" 
                     class="img-fluid rounded shadow" 
                     style="max-height: 400px;"
                     onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', headerHTML);

        const accordionData = [];
        
        if (data.description) {
            accordionData.push({
                id: 1,
                title: "📝 Описание породы",
                content: data.description
            });
        }
        
        if (data.characteristics) {
            accordionData.push({
                id: 2,
                title: "📊 Характеристики",
                content: data.characteristics
            });
        }
        
        if (data.temperament) {
            accordionData.push({
                id: 3,
                title: "😊 Темперамент",
                content: data.temperament
            });
        }
        
        if (data.care) {
            accordionData.push({
                id: 4,
                title: "💅 Уход и содержание",
                content: data.care
            });
        }
        
        if (accordionData.length > 0) {
            const accordion = new AccordionComponent(this.pageRoot);
            accordion.render(accordionData);
        } else {
            this.pageRoot.insertAdjacentHTML('beforeend', `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle"></i> Дополнительная информация отсутствует
                </div>
            `);
        }

        this.pageRoot.insertAdjacentHTML('beforeend', `
            <div class="mt-4 text-center text-muted">
                <small>ID собаки: ${data.id}</small>
            </div>
        `);
    }
}