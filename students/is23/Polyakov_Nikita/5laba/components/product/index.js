// components/product/index.js
class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        const imgSrc = data.photo_400 || 'https://placehold.co/200?text=Аватар';

        // Пол пользователя
        const sexMap = { 0: 'Не указан', 1: 'Женский', 2: 'Мужской' };
        const sex = sexMap[data.sex] || 'Не указан';

        // Дата рождения (может быть "5.6" или "5.6.1990")
        const bdate = data.bdate ? data.bdate : 'Не указана';

        // Город
        const city = data.city?.title || data.home_town || 'Не указан';

        // Страна
        const country = data.country?.title || 'Не указана';

        // Статус
        const status = data.status || 'Нет статуса';

        // Онлайн?
        const online = data.online ? '<span class="badge bg-success">Онлайн</span>' : '<span class="badge bg-secondary">Офлайн</span>';

        // Верифицирован?
        const verified = data.verified ? '<span class="badge bg-primary">Верифицирован</span>' : '';

        // Ссылка на профиль
        const profileUrl = `https://vk.com/${data.screen_name || 'id' + data.id}`;

        const html = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imgSrc}" class="img-fluid rounded-start" alt="${data.first_name} ${data.last_name}" style="object-fit: cover; height: 100%;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${data.first_name} ${data.last_name} ${verified}</h3>
                            <p class="card-text">
                                <strong>ID:</strong> ${data.id}<br>
                                <strong>Пол:</strong> ${sex}<br>
                                <strong>Дата рождения:</strong> ${bdate}<br>
                                <strong>Город:</strong> ${city}<br>
                                <strong>Страна:</strong> ${country}<br>
                                <strong>Подписчиков:</strong> ${data.followers_count || 0}<br>
                                <strong>Статус:</strong> ${status}<br>
                                <strong>Состояние:</strong> ${online}<br>
                                <strong>Последний визит:</strong> ${data.last_seen ? new Date(data.last_seen.time * 1000).toLocaleString() : 'Неизвестно'}<br>
                                
                            </p>
                            <a href="${profileUrl}" target="_blank" class="btn btn-outline-primary">Открыть в ВК</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.parent.innerHTML = html;
    }
}

export default ProductComponent;