class UserCard {
    constructor(parentSelector, onUserClick) {
        this.parent = document.querySelector(parentSelector);
        this.onUserClick = onUserClick;
    }

    renderUser(user) {
        const photoUrl = user.photo_400_orig || user.photo_200_orig || user.photo_100 || user.photo_50 || '';
        
        const html = `
            <div class="user-card" data-user-id="${user.id}">
                <img src="${photoUrl}" alt="фото" class="user-photo" crossorigin="anonymous" onerror="this.style.background='#f0f0f0'">
                <div class="user-info">
                    <h3 class="user-name">${user.first_name} ${user.last_name}</h3>
                    <button class="btn-details">Подробнее</button>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const card = this.parent.querySelector(`[data-user-id="${user.id}"]`);
        const button = card.querySelector('.btn-details');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.onUserClick(user.id);
        });
    }

    clear() {
        this.parent.innerHTML = '';
    }
}

export { UserCard };
