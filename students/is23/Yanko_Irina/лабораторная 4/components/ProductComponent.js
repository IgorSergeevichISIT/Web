// components/ProductComponent.js
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let bdateFormatted = 'Не указана';
        if (data.bdate) {
            bdateFormatted = data.bdate;
        }
    
    // Форматируем город
        let cityFormatted = 'Не указан';
        if (data.city && data.city.title) {
            cityFormatted = data.city.title;
        }
    
    // Определяем пол - ВОТ ЗДЕСЬ БЫЛА ОШИБКА
        let sexFormatted = 'Не указан';
        if (data.sex !== undefined) {
            if (data.sex === 1) {
                sexFormatted = 'Женский';
            } else if (data.sex === 2) {
                sexFormatted = 'Мужской';
            }
        }
    
    // Выбираем лучшее доступное фото
        const photoUrl = data.photo_400_orig || data.photo_max_orig || data.photo_200 || data.photo_100 || 'https://vk.com/images/camera_400.png';
    
        return `
        <div class="card shadow-lg" style="max-width: 800px;">
            <div class="row g-0">
                <!-- Фото -->
                <div class="col-md-5 text-center p-4 bg-light">
                    <img src="${photoUrl}" 
                         class="img-fluid rounded-circle border" 
                         alt="${data.first_name || ''} ${data.last_name || ''}"
                         style="width: 250px; height: 250px; object-fit: cover;">
                    <div class="mt-4">
                        <span class="badge bg-secondary fs-5 p-2">ID: ${data.id || 'Не указан'}</span>
                    </div>
                </div>
            
                <!-- Информация -->
                <div class="col-md-7">
                    <div class="card-body p-4">
                        <h2 class="card-title mb-4">${data.first_name || ''} ${data.last_name || ''}</h2>
                    
                        <div class="user-info">
                            <div class="info-item mb-3">
                                <h5 class="text-primary mb-2"><i class="bi bi-gender-ambiguous me-2"></i>Пол</h5>
                                <p class="fs-5">${sexFormatted}</p>
                        </div>
                        
                        <div class="info-item mb-3">
                            <h5 class="text-primary mb-2"><i class="bi bi-geo-alt me-2"></i>Город</h5>
                            <p class="fs-5">${cityFormatted}</p>
                        </div>
                        
                        <div class="info-item mb-4">
                            <h5 class="text-primary mb-2"><i class="bi bi-calendar3 me-2"></i>Дата рождения</h5>
                            <p class="fs-5">${bdateFormatted}</p>
                        </div>
                        
                        <div class="d-flex gap-3 mt-4 pt-3 border-top">
                            <a href="https://vk.com/id${data.id}" 
                               target="_blank" 
                               class="btn btn-primary flex-fill">
                                <i class="bi bi-box-arrow-up-right me-2"></i> Открыть профиль ВК
                            </a>
                            <button onclick="window.location.hash = ''" 
                                    class="btn btn-outline-secondary">
                                <i class="bi bi-arrow-left me-2"></i> Назад
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

    render(data) {
        const html = this.getHTML(data);
        this.parent.innerHTML = html;
    }
}