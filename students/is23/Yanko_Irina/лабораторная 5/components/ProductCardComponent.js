export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Используем photo_200 если есть, иначе photo_100, иначе заглушку
        const photoUrl = data.photo_200 || data.photo_100 || 'https://vk.com/images/camera_200.png';
        
        return (
            `
            <div class="card h-100 shadow-sm" style="width: 100%; max-width: 300px;">
                <div class="position-relative">
                    <img src="${photoUrl}" class="card-img-top" alt="${data.first_name} ${data.last_name}" style="height: 250px; object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-dark bg-opacity-75">ID: ${data.id}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">${data.first_name} ${data.last_name}</h5>
                    <div class="mt-auto text-center">
                        <button class="btn btn-primary w-100 click-card-btn" data-id="${data.id}">
                            <i class="bi bi-person-badge"></i> Подробнее
                        </button>
                    </div>
                </div>
            </div>
            `
        )
    }

    render(data, clickCard) {
        const html = this.getHTML(data);
    
        // Используем innerHTML для установки содержимого
        this.parent.innerHTML = html;
    
        // Ищем кнопку ВНУТРИ this.parent
        const button = this.parent.querySelector('.click-card-btn');
        if (button) {
            button.addEventListener('click', () => {
                console.log('Клик по кнопке, ID:', data.id); // для отладки
                clickCard(data.id);
            });
        }
    }
}