import { DogCardComponent } from "../../components/dog-card/index.js";
import { DogPage } from "../dog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Популярные породы собак</h1>
                
                <!-- Раскрывающаяся форма добавления -->
                <div class="card mb-4">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center" 
                         style="cursor: pointer;"
                         id="add-form-header"
                         data-bs-toggle="collapse" 
                         data-bs-target="#add-form-collapse" 
                         aria-expanded="false" 
                         aria-controls="add-form-collapse">
                        <h5 class="mb-0">
                            <i class="bi bi-plus-circle"></i> Добавить новую породу
                        </h5>
                        <span class="badge bg-light text-primary">
                            <i class="bi bi-chevron-down"></i>
                        </span>
                    </div>
                    
                    <div class="collapse" id="add-form-collapse">
                        <div class="card-body">
                            <form id="add-dog-form">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">Название породы *</label>
                                            <input type="text" class="form-control" id="breed" 
                                                   placeholder="Например: Сибирский хаски" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Краткое описание *</label>
                                            <input type="text" class="form-control" id="shortDescription" 
                                                   placeholder="Краткая характеристика породы" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">URL изображения *</label>
                                            <input type="url" class="form-control" id="image" 
                                                   placeholder="https://example.com/dog.jpg" required>
                                            <div class="form-text">Ссылка на изображение собаки</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label class="form-label">Полное описание</label>
                                            <textarea class="form-control" id="description" rows="3" 
                                                      placeholder="Подробное описание породы..."></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Характеристики</label>
                                            <textarea class="form-control" id="characteristics" rows="2" 
                                                      placeholder="Рост, вес, продолжительность жизни..."></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Темперамент</label>
                                            <input type="text" class="form-control" id="temperament" 
                                                   placeholder="Например: Дружелюбный, активный">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Уход и содержание</label>
                                            <textarea class="form-control" id="care" rows="2" 
                                                      placeholder="Особенности ухода..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex gap-2">
                                    <button type="submit" class="btn btn-success">
                                        <i class="bi bi-check-circle"></i> Добавить породу
                                    </button>
                                    <button type="reset" class="btn btn-secondary">
                                        <i class="bi bi-x-circle"></i> Очистить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <!-- Контейнер для карточек -->
                <h3 class="mb-3">Список пород:</h3>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
                
                <!-- Информация о API -->
                <div class="mt-4 text-center text-muted">
                    <small>Данные загружаются с API: http://localhost:8000/dogs</small>
                </div>
            </div>
        `;
    }

    // Обработчик клика по карточке
    clickCard(e) {
        const cardId = e.target.dataset.id;
        const dogPage = new DogPage(this.parent, cardId);
        dogPage.render();
    }

    // Обработчик удаления собаки
    async handleDeleteDog(id) {
        // Сначала получим данные собаки для отображения названия в подтверждении
        try {
            const dog = await window.dogsAPI.getDogById(id);
            if (!confirm(`Вы уверены, что хотите удалить породу "${dog.breed}"?`)) return;
            
            const result = await window.dogsAPI.deleteDog(id);
            alert(result.message);
            this.render(); // Перезагружаем страницу
        } catch (error) {
            alert(`Ошибка при удалении: ${error.message}`);
        }
    }

    // Настройка формы добавления
    setupAddForm() {
        const form = document.getElementById('add-dog-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dogData = {
                breed: document.getElementById('breed').value,
                shortDescription: document.getElementById('shortDescription').value,
                image: document.getElementById('image').value,
                description: document.getElementById('description').value,
                characteristics: document.getElementById('characteristics').value,
                temperament: document.getElementById('temperament').value,
                care: document.getElementById('care').value || ''
            };
            
            // Валидация URL
            if (!dogData.image.startsWith('http')) {
                alert('URL изображения должен начинаться с http:// или https://');
                return;
            }
            
            try {
                const newDog = await window.dogsAPI.addDog(dogData);
                alert(`Порода "${newDog.breed}" успешно добавлена с ID: ${newDog.id}`);
                form.reset(); // Очищаем форму
                this.loadAndRenderDogs(); // Обновляем список
                
                // Сворачиваем форму после успешного добавления
                const collapseElement = document.getElementById('add-form-collapse');
                if (collapseElement) {
                    new bootstrap.Collapse(collapseElement, { toggle: false }).hide();
                }
            } catch (error) {
                alert(`Ошибка при добавлении: ${error.message}`);
            }
        });
    }

    // Загрузка и отображение данных
    async loadAndRenderDogs() {
        const dogs = await window.dogsAPI.getAllDogs();
        
        if (dogs.length === 0) {
            this.pageRoot.innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-exclamation-triangle"></i> 
                    Нет доступных пород собак. Нажмите "Добавить новую породу" выше, чтобы создать первую!
                </div>
            `;
            return;
        }

        // Очищаем контейнер
        this.pageRoot.innerHTML = '';
        
        // Создаем карточки
        dogs.forEach((dog) => {
            const dogCard = new DogCardComponent(this.pageRoot);
            dogCard.render(dog, this.clickCard.bind(this), this.handleDeleteDog.bind(this));
        });
    }

    // Добавляем обработчик для улучшения UX
    enhanceAccordion() {
        const header = document.getElementById('add-form-header');
        const collapse = document.getElementById('add-form-collapse');
        
        if (header && collapse) {
            // Меняем иконку при раскрытии/сворачивании
            collapse.addEventListener('show.bs.collapse', () => {
                const icon = header.querySelector('i.bi-chevron-down');
                if (icon) {
                    icon.className = 'bi bi-chevron-up';
                }
            });
            
            collapse.addEventListener('hide.bs.collapse', () => {
                const icon = header.querySelector('i.bi-chevron-up');
                if (icon) {
                    icon.className = 'bi bi-chevron-down';
                }
            });
        }
    }

    // Главный метод рендеринга
    async render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Настраиваем форму
        this.setupAddForm();
        
        // Улучшаем аккордеон
        this.enhanceAccordion();
        
        // Загружаем и отображаем собак
        await this.loadAndRenderDogs();
    }
}