import { UserCardComponent } from "../../components/user-card/index.js";
import { UserPage } from "../user/index.js";
import { SortFilterComponent } from "../../components/sort-filter/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";

// Single Responsibility Principle: Слишком много ответственнойстей class MainPage

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentSort = '';
    }

    getData(sort = '') {
        console.log("Загружаем пользователей с сортировкой:", sort);
        
        ajax.get(urls.getGroupMembers(groupId, sort), (data) => {
            console.log("Данные получены:", data);
            
            if (data.error) {
                console.error("Ошибка API:", data.error);
                this.showError();
                return;
            }
            
            if (data.response && data.response.items) {
                this.renderData(data.response.items);
            } else {
                console.error("Неправильная структура ответа:", data);
                this.showError();
            }
        });
    }

    showError() {
        const pageRoot = document.getElementById('main-page');
        if (pageRoot) {
            pageRoot.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Ошибка загрузки данных</h4>
                    <p>Проверьте:</p>
                    <ul>
                        <li>Access token в consts.js</li>
                        <li>ID группы в consts.js</li>
                        <li>CORS расширение в браузере</li>
                        <li>Консоль браузера (F12) для подробностей</li>
                    </ul>
                    <button class="btn btn-warning" id="retry-btn">Повторить попытку</button>
                </div>
            `;
            
            document.getElementById('retry-btn').addEventListener('click', () => {
                this.getData(this.currentSort);
            });
        }
    }

    renderData(items) {
        const pageRoot = document.getElementById('main-page');
        if (!pageRoot) return;
        
        pageRoot.innerHTML = ''; 
        
        if (items.length === 0) {
            pageRoot.innerHTML = `
                <div class="alert alert-info">
                    В группе нет участников или они скрыты настройками приватности
                </div>
            `;
            return;
        }
        
        items.forEach((item) => {
            const userCard = new UserCardComponent(pageRoot);
            userCard.render(item, this.clickCard.bind(this));
        });
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Участники группы VK</h1>
                
                <!-- Место для компонента сортировки будет здесь -->
                <div id="sort-container"></div>
                
                <!-- Контейнер для карточек пользователей -->
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;
    }

    handleSortChange(newSort) {
        console.log("Сортировка изменена на:", newSort);
        this.currentSort = newSort;
        this.getData(newSort);
    }

    clickCard(e) {
        const userId = e.target.dataset.id;
        console.log("Переходим к пользователю ID:", userId);
        const userPage = new UserPage(this.parent, userId);
        userPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const sortContainer = document.getElementById('sort-container');
        if (sortContainer) {
            const sortFilter = new SortFilterComponent(
                sortContainer, 
                this.currentSort,
                this.handleSortChange.bind(this)
            );
            sortFilter.render();
        }

        this.getData();
    }
}