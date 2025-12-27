export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        const lastSeen = data.last_seen ? new Date(data.last_seen.time * 1000).toLocaleString() : 'Неизвестно';
        
        return (`
            <div class="card mb-3" style="width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.photo_max}" class="img-fluid rounded-start" alt="фото пользователя" style="height: 300px; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                            <p class="card-text"><strong>ID:</strong> ${data.id}</p>
                            <p class="card-text"><strong>Статус:</strong> ${data.status || 'Нет статуса'}</p>
                            <p class="card-text"><strong>Был в сети:</strong> ${lastSeen}</p>
                            <p class="card-text"><small class="text-muted">Данные из VK API</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}