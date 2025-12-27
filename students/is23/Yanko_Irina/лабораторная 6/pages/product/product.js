import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        console.log('📄 ProductPage создана для пользователя ID:', id);
    }

    getHTML() {
        return (
            `
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                        <!-- Кнопка назад -->
                        <div class="mb-4">
                            <button class="btn btn-secondary" id="back-button">
                                <i class="bi bi-arrow-left"></i> Назад к списку
                            </button>
                        </div>
                        
                        <!-- Заголовок -->
                        <div class="text-center mb-5">
                            <h1 class="display-5 mb-3">Профиль пользователя</h1>
                            <p class="text-muted">Загрузка информации...</p>
                        </div>
                        
                        <!-- Контейнер для данных пользователя -->
                        <div id="product-container"></div>
                    </div>
                </div>
            </div>
            `
        )
    }

    getData() {
        const container = document.getElementById('product-container');
        
        if (!this.id) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    <h5>Ошибка!</h5>
                    <p>Не указан ID пользователя</p>
                    <button class="btn btn-primary" id="go-back-btn">Вернуться назад</button>
                </div>
            `;
            
            document.getElementById('go-back-btn').addEventListener('click', () => {
                window.location.hash = '';
            });
            return;
        }
        
        container.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <p class="mt-3">Загрузка профиля пользователя ID: ${this.id}...</p>
            </div>
        `;
        
        const url = urls.getUserInfo(this.id);
        
        ajax.post(url, (data) => {
            if (data.error) {
                container.innerHTML = `
                    <div class="alert alert-danger">
                        <h5>Ошибка загрузки профиля</h5>
                        <p>${data.error.error_msg}</p>
                        <button class="btn btn-primary" onclick="window.location.hash = ''">Вернуться</button>
                    </div>
                `;
                return;
            }
            
            if (data.response && data.response.length > 0) {
                this.renderData(data.response[0]);
            } else {
                container.innerHTML = `
                    <div class="alert alert-warning">
                        <h5>Пользователь не найден</h5>
                        <p>Пользователь с ID ${this.id} не найден в базе данных</p>
                        <button class="btn btn-primary" onclick="window.location.hash = ''">Вернуться</button>
                    </div>
                `;
            }
        });
    }

    renderData(item) {
        const container = document.getElementById('product-container');
        
        const photoUrl = item.photo_400_orig || item.photo_200 || item.photo_100 || 'https://vk.com/images/camera_400.png';
        
        // Определяем роль и цвет
        let roleText = 'Участник';
        let roleColor = 'secondary';
        let roleIcon = 'person';
        
        if (item.is_admin) {
            if (item.role === 'creator') {
                roleText = 'Создатель группы';
                roleColor = 'danger';
                roleIcon = 'star-fill';
            } else if (item.role === 'administrator') {
                roleText = 'Администратор';
                roleColor = 'warning';
                roleIcon = 'shield-check';
            } else if (item.role === 'moderator') {
                roleText = 'Модератор';
                roleColor = 'info';
                roleIcon = 'shield';
            }
        }
        
        container.innerHTML = `
            <div class="card shadow-lg">
                <div class="row g-0">
                    <!-- Фото -->
                    <div class="col-md-4 d-flex align-items-center justify-content-center p-4 bg-light">
                        <div class="text-center">
                            <img src="${photoUrl}" 
                                 class="img-fluid rounded-circle shadow mb-3" 
                                 alt="${item.first_name} ${item.last_name}"
                                 style="width: 200px; height: 200px; object-fit: cover;">
                            <div class="mb-2">
                                <span class="badge bg-dark fs-5 p-2">ID: ${item.id}</span>
                            </div>
                            <div class="mb-2">
                                <span class="badge bg-${roleColor} fs-6 p-2">
                                    <i class="bi bi-${roleIcon}"></i> ${roleText}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Информация -->
                    <div class="col-md-8">
                        <div class="card-body p-4">
                            <h2 class="card-title mb-4">${item.first_name} ${item.last_name}</h2>
                            
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-person-circle fs-4 text-primary me-3"></i>
                                        <div>
                                            <small class="text-muted">Тип профиля</small>
                                            <div class="fs-5">
                                                ${item.is_closed ? 
                                                    '<span class="badge bg-dark"><i class="bi bi-lock"></i> Закрытый</span>' : 
                                                    '<span class="badge bg-success"><i class="bi bi-unlock"></i> Открытый</span>'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-6 mb-3">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-shield-check fs-4 text-primary me-3"></i>
                                        <div>
                                            <small class="text-muted">Статус администратора</small>
                                            <div class="fs-5">
                                                ${item.is_admin ? 
                                                    '<span class="badge bg-success">Да</span>' : 
                                                    '<span class="badge bg-secondary">Нет</span>'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                ${item.city ? `
                                <div class="col-md-6 mb-3">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-geo-alt fs-4 text-primary me-3"></i>
                                        <div>
                                            <small class="text-muted">Город</small>
                                            <div class="fs-5">${item.city.title}</div>
                                        </div>
                                    </div>
                                </div>
                                ` : ''}
                                
                                ${item.bdate ? `
                                <div class="col-md-6 mb-3">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-calendar3 fs-4 text-primary me-3"></i>
                                        <div>
                                            <small class="text-muted">Дата рождения</small>
                                            <div class="fs-5">${item.bdate}</div>
                                        </div>
                                    </div>
                                </div>
                                ` : ''}
                            </div>
                            
                            <hr class="my-4">
                            
                            <div class="d-flex gap-3">
                                ${item.id ? `
                                <a href="https://vk.com/id${item.id}" target="_blank" class="btn btn-primary flex-fill">
                                    <i class="bi bi-box-arrow-up-right me-2"></i> Открыть профиль ВКонтакте
                                </a>
                                ` : ''}
                                <button class="btn btn-outline-secondary" id="back-btn-2">
                                    <i class="bi bi-arrow-left me-2"></i> Назад
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Обработчики кнопок "Назад"
        document.getElementById('back-btn-2').addEventListener('click', () => {
            window.location.hash = '';
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Обработчик кнопки "Назад"
        document.getElementById('back-button').addEventListener('click', () => {
            window.location.hash = '';
        });
        
        this.getData();
    }
}