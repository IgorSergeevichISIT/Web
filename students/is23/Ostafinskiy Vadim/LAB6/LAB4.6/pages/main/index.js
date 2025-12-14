import { UserCardComponent } from "../../components/user-card/index.js";
import { UserPage } from "../user/index.js";
import { SortFilterComponent } from "../../components/sort-filter/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentSort = '';
    }

    async getData(sort = '') {
        console.log("Загружаем пользователей с сортировкой:", sort);
        
        try {
            const users = await window.vkUsersAPI.getAllUsers(sort);
            this.renderData(users);
        } catch (error) {
            console.error("Ошибка API:", error);
            this.showError();
        }
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
            
            <!-- Добавленная форма (сверху, раскрывающаяся) -->
            <div class="card mb-4">
                <div class="card-header bg-success text-white d-flex justify-content-between align-items-center" 
                     style="cursor: pointer;"
                     id="add-form-header"
                     data-bs-toggle="collapse" 
                     data-bs-target="#add-form-collapse" 
                     aria-expanded="false" 
                     aria-controls="add-form-collapse">
                    <h5 class="mb-0">
                        <i class="bi bi-person-plus"></i> Добавить пользователя
                    </h5>
                    <span class="badge bg-light text-success">
                        <i class="bi bi-chevron-down"></i>
                    </span>
                </div>
                
                <div class="collapse" id="add-form-collapse">
                    <div class="card-body">
                        <form id="add-user-form">
                            <!-- ... остальная форма ... -->
                        </form>
                        <div class="mt-3 text-muted small">
                            <i class="bi bi-info-circle"></i> 
                            Добавленные пользователи участвуют в сортировке вместе с VK пользователями
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Место для компонента сортировки -->
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

    setupAddForm() {
        const form = document.getElementById('add-user-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                photo_400_orig: document.getElementById('photo_400_orig').value,
                city: document.getElementById('city').value ? { title: document.getElementById('city').value } : null,
                bdate: document.getElementById('bdate').value || '',
                sex: parseInt(document.getElementById('sex').value) || 0,
                online: document.getElementById('online').checked,
                relation: parseInt(document.getElementById('relation').value) || 0,
                counters: document.getElementById('friends_count').value ? {
                    friends: parseInt(document.getElementById('friends_count').value)
                } : null,
                about: document.getElementById('about').value || ''
            };
            
            try {
                const newUser = await window.vkUsersAPI.addUser(userData);
                alert(`Пользователь "${newUser.first_name} ${newUser.last_name}" успешно добавлен!`);
                form.reset();
                await this.getData(this.currentSort);

                const collapseElement = document.getElementById('add-form-collapse');
                if (collapseElement) {
                    new bootstrap.Collapse(collapseElement, { toggle: false }).hide();
                }
            } catch (error) {
                alert(`Ошибка: ${error.message}`);
            }
        });
    }

    async render() {
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

        this.setupAddForm();

        await this.getData();
    }
}