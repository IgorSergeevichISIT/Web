import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {ProductCardComponent} from "../../components/ProductCardComponent.js";
import {FilterComponent} from "../../components/FilterComponent.js";

export class IndexPage {
    constructor(parent) {
        this.parent = parent;
        this.currentFilter = 'all';
        console.log('IndexPage создана');
    }

    getHTML() {
        return `
        <div class="container py-4">
            <!-- Заголовок -->
            <div class="row justify-content-center mb-4">
                <div class="col-12 col-md-8 col-lg-6 text-center">
                    <h1 class="display-5 mb-3">Участники группы ВКонтакте</h1>
                    <p class="lead text-muted">Управление участниками группы через VK API</p>
                    <div class="mt-3">
                        <button class="btn btn-success" id="add-user-header-btn">
                            <i class="bi bi-person-plus"></i> Добавить пользователя
                        </button>
                    </div>
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
        console.log('Клик по карточке:', userId);
        window.location.hash = `product/${userId}`;
    }

    renderData(items) {
        console.log('renderData: отрисовка', items?.length, 'пользователей');
        
        const container = document.getElementById('cards-container');
        const countElement = document.getElementById('members-count');
        
        // Очищаем контейнер
        container.innerHTML = '';
        
        if (!items || items.length === 0) {
            console.log('Нет данных для отображения');
            container.innerHTML = `
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="alert alert-info text-center shadow">
                        <i class="bi bi-info-circle-fill fs-4"></i>
                        <h5 class="mt-2">Нет участников для отображения</h5>
                        <p>Добавьте первого пользователя</p>
                    </div>
                </div>
            `;
            countElement.textContent = '0';
            
            // Добавляем карточку для добавления пользователя
            this.addAddUserForm();
            return;
        }
        
        countElement.textContent = items.length;
        console.log('Отображаем пользователей:', items);
        
        // Рендерим карточки пользователей
        items.forEach((item, index) => {
            console.log(`Карточка ${index + 1}:`, item.first_name, item.last_name);
            
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center user-card';
            col.dataset.userId = item.id;
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.clickCard.bind(this));
            
            // Добавляем кнопку удаления
            this.addDeleteButton(col, item.id);
            
            container.appendChild(col);
        });
        
        // Добавляем карточку для добавления пользователя
        this.addAddUserForm();
    }

    addDeleteButton(cardElement, userId) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm mt-2 w-100 delete-user-btn';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Удалить';
        deleteBtn.dataset.userId = userId;
        
        // Добавляем обработчик удаления
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.deleteUser(userId);
        });
        
        const cardBody = cardElement.querySelector('.card-body');
        if (cardBody) {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'text-center mt-2';
            buttonContainer.appendChild(deleteBtn);
            cardBody.appendChild(buttonContainer);
        }
    }

    deleteUser(userId) {
        if (!confirm(`Вы уверены, что хотите удалить пользователя с ID ${userId}?`)) {
            return;
        }
        
        console.log('Удаление пользователя ID:', userId);
        
        fetch(`http://localhost:8000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Пользователь удален:', data);
            
            if (data.error) {
                alert(`Ошибка при удалении: ${data.error.message}`);
                return;
            }
            
            // Показываем сообщение об успехе
            this.showNotification('Пользователь успешно удален', 'success');
            
            // Обновляем данные
            this.loadUsersData();
        })
        .catch(error => {
            console.error('Ошибка при удалении:', error);
            this.showNotification('Ошибка при удалении пользователя', 'error');
        });
    }

    addAddUserForm() {
        const container = document.getElementById('cards-container');
        
        // Проверяем, нет ли уже карточки добавления
        if (container.querySelector('.add-user-form-card')) {
            return;
        }
        
        const addCardHTML = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center add-user-form-card">
                <div class="card h-100 shadow-sm" style="width: 100%; max-width: 300px; border: 2px dashed #dee2e6; background: #f8f9fa;">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center p-4">
                        <div class="mb-3">
                            <i class="bi bi-plus-circle" style="font-size: 3rem; color: #6c757d;"></i>
                        </div>
                        <h5 class="card-title mb-3">Добавить пользователя</h5>
                        <p class="text-muted small mb-3">Нажмите чтобы добавить нового участника</p>
                        <button class="btn btn-outline-primary w-100" id="show-add-user-modal-btn">
                            <i class="bi bi-person-plus"></i> Добавить
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', addCardHTML);
        
        // Добавляем обработчик события
        const addBtn = document.getElementById('show-add-user-modal-btn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Кнопка "Добавить пользователя" нажата');
                this.showAddUserModal();
            });
        }
    }

    showAddUserModal() {
        console.log('Показываем модальное окно добавления пользователя');
        
        // Удаляем старую модалку если есть
        const oldModal = document.getElementById('addUserModal');
        if (oldModal) {
            oldModal.remove();
        }
        
        const modalHTML = `
            <div class="modal fade" id="addUserModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="bi bi-person-plus me-2"></i>Добавить пользователя
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="add-user-form">
                                <div class="mb-3">
                                    <label class="form-label">Имя *</label>
                                    <input type="text" class="form-control" name="first_name" required 
                                           placeholder="Введите имя" id="first-name-input">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Фамилия *</label>
                                    <input type="text" class="form-control" name="last_name" required
                                           placeholder="Введите фамилию" id="last-name-input">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">URL фото (200x200)</label>
                                    <input type="url" class="form-control" name="photo_200" 
                                           placeholder="https://example.com/photo.jpg" id="photo-input">
                                    <div class="form-text">Оставьте пустым для фото по умолчанию</div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" name="is_closed" id="is-closed-checkbox">
                                        <label class="form-check-label" for="is-closed-checkbox">
                                            Закрытый профиль
                                        </label>
                                    </div>
                                </div>
                                <div class="alert alert-info">
                                    <i class="bi bi-info-circle"></i> Поля помеченные * обязательны для заполнения
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancel-modal-btn">
                                <i class="bi bi-x-circle"></i> Отмена
                            </button>
                            <button type="button" class="btn btn-primary" id="save-user-btn">
                                <i class="bi bi-check-circle"></i> Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Инициализируем модальное окно Bootstrap
        const modalElement = document.getElementById('addUserModal');
        const modal = new bootstrap.Modal(modalElement);
        
        // Показываем модальное окно
        modal.show();
        
        // Фокус на первом поле
        setTimeout(() => {
            const firstNameInput = document.getElementById('first-name-input');
            if (firstNameInput) {
                firstNameInput.focus();
            }
        }, 500);
        
        // Обработчик сохранения
        const saveBtn = document.getElementById('save-user-btn');
        const saveHandler = () => {
            console.log('Кнопка "Сохранить" нажата');
            this.saveNewUser(modal);
        };
        saveBtn.addEventListener('click', saveHandler);
        
        // Обработчик отмены
        const cancelBtn = document.getElementById('cancel-modal-btn');
        cancelBtn.addEventListener('click', () => {
            modal.hide();
        });
        
        // Обработчик отправки формы по Enter
        const form = document.getElementById('add-user-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Форма отправлена');
            this.saveNewUser(modal);
        });
        
        // Удаляем модальное окно после закрытия
        modalElement.addEventListener('hidden.bs.modal', function() {
            console.log('Модальное окно закрыто');
            // Удаляем обработчики
            saveBtn.removeEventListener('click', saveHandler);
            setTimeout(() => {
                if (this.parentNode) {
                    this.remove();
                }
            }, 300);
        });
    }

    saveNewUser(modal) {
        console.log('Начинаем сохранение нового пользователя...');
        
        // Получаем данные из формы
        const firstName = document.getElementById('first-name-input')?.value.trim();
        const lastName = document.getElementById('last-name-input')?.value.trim();
        const photoUrl = document.getElementById('photo-input')?.value.trim();
        const isClosed = document.getElementById('is-closed-checkbox')?.checked || false;
        
        console.log('Данные формы:', { firstName, lastName, photoUrl, isClosed });
        
        // Проверяем обязательные поля
        if (!firstName || !lastName) {
            this.showNotification('Пожалуйста, заполните имя и фамилию', 'warning');
            return;
        }
        
        // Подготавливаем данные
        const userData = {
            first_name: firstName,
            last_name: lastName,
            photo_200: photoUrl || undefined,
            is_closed: isClosed
        };
        
        console.log('Отправляемые данные:', userData);
        
        // Показываем индикатор загрузки
        const saveBtn = document.getElementById('save-user-btn');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Сохранение...';
        saveBtn.disabled = true;
        
        // Отправляем запрос на бэкенд
        fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            console.log('Статус ответа сервера:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Ответ от сервера:', data);
            
            if (!data.success) {
                throw new Error(data.error?.message || 'Ошибка при добавлении пользователя');
            }
            
            // Закрываем модальное окно
            modal.hide();
            
            // Очищаем форму
            document.getElementById('first-name-input').value = '';
            document.getElementById('last-name-input').value = '';
            document.getElementById('photo-input').value = '';
            document.getElementById('is-closed-checkbox').checked = false;
            
            // Показываем сообщение об успехе
            this.showNotification(`Пользователь "${firstName} ${lastName}" успешно добавлен!`, 'success');
            
            console.log('Обновляем список пользователей...');
            
            // Обновляем данные с небольшим ожиданием
            setTimeout(() => {
                this.loadUsersData();
            }, 500);
            
        })
        .catch(error => {
            console.error('Ошибка при добавлении пользователя:', error);
            this.showNotification(`Ошибка: ${error.message}`, 'error');
        })
        .finally(() => {
            // Восстанавливаем кнопку
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        });
    }

    loadUsersData() {
        console.log('Загрузка данных пользователей...');
        
        const container = document.getElementById('cards-container');
        const countElement = document.getElementById('members-count');
        
        // Показываем индикатор загрузки
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="d-flex flex-column align-items-center">
                    <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <h5>Обновление списка пользователей...</h5>
                    <p class="text-muted">Фильтр: ${this.getFilterName(this.currentFilter)}</p>
                </div>
            </div>
        `;
        
        countElement.textContent = '0';
        
        const url = urls.getGroupMembers(groupId, this.currentFilter);
        console.log('URL запроса:', url);
        
        ajax.post(url, (data) => {
            console.log('Полученные данные:', data);
            
            if (data.error) {
                console.error('Ошибка API:', data.error);
                container.innerHTML = `
                    <div class="col-12 col-md-10 col-lg-8">
                        <div class="alert alert-danger">
                            <h5>Ошибка загрузки</h5>
                            <p>${data.error.error_msg}</p>
                            <button class="btn btn-primary" onclick="location.reload()">Обновить</button>
                        </div>
                    </div>
                `;
                return;
            }
            
            if (data.response && data.response.items) {
                console.log(`Получено ${data.response.items.length} пользователей`);
                // Небольшая задержка для плавности
                setTimeout(() => {
                    this.renderData(data.response.items);
                }, 300);
            } else {
                console.error('Неверный формат данных:', data);
                container.innerHTML = `
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="alert alert-warning">
                            <h5>Неверный формат данных</h5>
                            <p>Проверьте работу бэкенда</p>
                            <pre class="mt-2">${JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                `;
            }
        });
    }

    showNotification(message, type = 'info') {
        // Удаляем старые уведомления
        const oldNotifications = document.querySelectorAll('.custom-notification');
        oldNotifications.forEach(notification => notification.remove());
        
        const typeClass = type === 'error' ? 'danger' : 
                         type === 'success' ? 'success' : 
                         type === 'warning' ? 'warning' : 'info';
        
        const icon = type === 'success' ? '✅' : 
                    type === 'error' ? '❌' : 
                    type === 'warning' ? '⚠️' : 'ℹ️';
        
        const notificationHTML = `
            <div class="custom-notification alert alert-${typeClass} alert-dismissible fade show position-fixed"
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                <strong>${icon}</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', notificationHTML);
        
        // Автоматически скрываем через 3 секунды
        setTimeout(() => {
            const notification = document.querySelector('.custom-notification');
            if (notification) {
                notification.remove();
            }
        }, 3000);
    }

    setupFilter() {
        const filterContainer = document.getElementById('filter-container');
        const filterComponent = new FilterComponent(
            filterContainer,
            this.currentFilter,
            (newFilter) => {
                console.log('🔀 Изменен фильтр:', newFilter);
                this.currentFilter = newFilter;
                this.loadUsersData();
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
        console.log('Рендеринг IndexPage');
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Обработчик кнопки добавления в заголовке
        const headerAddBtn = document.getElementById('add-user-header-btn');
        if (headerAddBtn) {
            headerAddBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Кнопка добавления в заголовке нажата');
                this.showAddUserModal();
            });
        }
        
        this.setupFilter();
        this.loadUsersData();
    }
}