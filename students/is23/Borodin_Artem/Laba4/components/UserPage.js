class UserPage {
    constructor(parentSelector, onBack) {
        this.parent = document.querySelector(parentSelector);
        this.onBack = onBack;
    }

    render(user) {
        const photoUrl = user.photo_max || user.photo_400_orig || user.photo_200_orig || user.photo_100 || user.photo_50 || '';
        
        const birthDate = user.bdate ? `<p><strong>День рождения:</strong> ${user.bdate}</p>` : '';
        const cityName = user.city ? `<p><strong>Город:</strong> ${user.city.title}</p>` : '';
        const about = user.about ? `<p><strong>О себе:</strong> ${user.about}</p>` : '';

        const html = `
            <div class="user-page">
                <button class="btn-back">← Назад к списку</button>
                
                <div class="user-details">
                    <img src="${photoUrl}" alt="фото" class="user-details-photo" crossorigin="anonymous" onerror="this.style.background='#f0f0f0'">
                    
                    <div class="user-details-info">
                        <h2>${user.first_name} ${user.last_name}</h2>
                        ${birthDate}
                        ${cityName}
                        ${about}
                    </div>
                </div>
            </div>
        `;
        
        this.parent.innerHTML = html;
        
        const backButton = this.parent.querySelector('.btn-back');
        backButton.addEventListener('click', () => {
            this.onBack();
        });
    }

    clear() {
        this.parent.innerHTML = '';
    }
}

export { UserPage };
