export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        // Используем photo_400_orig если есть, иначе photo_200
        const photoUrl = data.photo_400_orig || data.photo_200 || data.photo_100 || 'https://vk.com/images/camera_400.png';
        
        return (
            `
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="card shadow-lg border-0" style="max-width: 600px; margin: 0 auto;">
                        <div class="row g-0">
                            <!-- Фото слева -->
                            <div class="col-md-5 d-flex align-items-center justify-content-center p-4">
                                <div class="text-center">
                                    <img src="${photoUrl}" 
                                         class="img-fluid rounded-circle shadow" 
                                         alt="${data.first_name} ${data.last_name}"
                                         style="width: 200px; height: 200px; object-fit: cover;">
                                    <div class="mt-3">
                                        <span class="badge bg-secondary fs-6 p-2">ID: ${data.id}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Информация справа -->
                            <div class="col-md-7">
                                <div class="card-body p-4">
                                    <h2 class="card-title mb-3">${data.first_name} ${data.last_name}</h2>
                                    
                                    <div class="mb-4">
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="bi bi-person-circle fs-5 text-primary me-3"></i>
                                            <div>
                                                <small class="text-muted">Тип профиля</small>
                                                <div>${data.is_closed ? 'Закрытый' : 'Открытый'} профиль</div>
                                            </div>
                                        </div>
                                        
                                        ${data.city ? `
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="bi bi-geo-alt fs-5 text-primary me-3"></i>
                                            <div>
                                                <small class="text-muted">Город</small>
                                                <div>${data.city.title}</div>
                                            </div>
                                        </div>
                                        ` : ''}
                                        
                                        ${data.bdate ? `
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="bi bi-calendar3 fs-5 text-primary me-3"></i>
                                            <div>
                                                <small class="text-muted">Дата рождения</small>
                                                <div>${data.bdate}</div>
                                            </div>
                                        </div>
                                        ` : ''}
                                    </div>
                                    
                                    <div class="d-flex gap-2 mt-4">
                                        <a href="https://vk.com/id${data.id}" target="_blank" class="btn btn-primary flex-fill">
                                            <i class="bi bi-box-arrow-up-right me-2"></i> Профиль ВК
                                        </a>
                                        <button onclick="window.history.back()" class="btn btn-outline-secondary">
                                            <i class="bi bi-arrow-left me-2"></i> Назад
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.innerHTML = html
    }
}