export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const photoUrl = data.photo_200 || data.photo_100 || 'https://vk.com/images/camera_200.png';
        
        // Определяем цвет и текст роли по VK API
        let roleBadge = '';
        let roleColor = 'secondary';
        let roleText = 'Участник';
        
        if (data.role) {
            switch(data.role) {
                case 'creator':
                    roleText = 'Создатель';
                    roleColor = 'danger';
                    roleBadge = `<span class="badge bg-${roleColor}"><i class="bi bi-star-fill"></i> ${roleText}</span>`;
                    break;
                case 'administrator':
                    roleText = 'Админ';
                    roleColor = 'warning';
                    roleBadge = `<span class="badge bg-${roleColor} text-dark"><i class="bi bi-shield-check"></i> ${roleText}</span>`;
                    break;
                case 'moderator':
                    roleText = 'Модератор';
                    roleColor = 'info';
                    roleBadge = `<span class="badge bg-${roleColor}"><i class="bi bi-shield"></i> ${roleText}</span>`;
                    break;
                case 'editor':
                    roleText = 'Редактор';
                    roleColor = 'primary';
                    roleBadge = `<span class="badge bg-${roleColor}"><i class="bi bi-pencil"></i> ${roleText}</span>`;
                    break;
                default:
                    roleText = 'Участник';
                    roleColor = 'secondary';
                    roleBadge = `<span class="badge bg-${roleColor}"><i class="bi bi-person"></i> ${roleText}</span>`;
            }
        }
        
        return (
            `
            <div class="card h-100 shadow-sm" style="width: 100%; max-width: 300px;">
                <div class="position-relative">
                    <img src="${photoUrl}" class="card-img-top" alt="${data.first_name} ${data.last_name}" 
                         style="height: 250px; object-fit: cover; width: 100%;">
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-dark bg-opacity-75">ID: ${data.id}</span>
                    </div>
                    <div class="position-absolute bottom-0 start-0 m-2">
                        ${roleBadge}
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center mb-2">${data.first_name} ${data.last_name}</h5>
                    
                    <div class="mb-2 text-center">
                        <span class="badge ${data.is_closed ? 'bg-dark' : 'bg-success'}">
                            <i class="bi ${data.is_closed ? 'bi-lock' : 'bi-unlock'}"></i> 
                            ${data.is_closed ? 'Закрытый' : 'Открытый'} профиль
                        </span>
                    </div>
                    
                    <div class="small text-muted text-center mb-3">
                        <i class="bi bi-tag"></i> VK API role: <code>${data.role || 'member'}</code>
                    </div>
                    
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 view-details-btn" data-id="${data.id}">
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
        this.parent.innerHTML = html;
        
        const button = this.parent.querySelector('.view-details-btn');
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                clickCard(data.id);
            });
        }
        
        // Также делаем всю карточку кликабельной
        const card = this.parent.querySelector('.card');
        if (card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Не срабатывает при клике на кнопку удаления или кнопку подробнее
                if (!e.target.closest('.delete-btn') && !e.target.closest('.view-details-btn')) {
                    clickCard(data.id);
                }
            });
        }
    }
}