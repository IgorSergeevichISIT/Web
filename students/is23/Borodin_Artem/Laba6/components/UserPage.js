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
      <div class="user-page-header">
        <div class="user-page-photo">
          <img src="${photoUrl}" alt="${user.first_name} ${user.last_name}" />
        </div>
        <div class="user-page-info">
          <h2>${user.first_name} ${user.last_name}</h2>
          ${birthDate}
          ${cityName}
          ${about}
          <button id="back-btn" class="btn back-button">← Назад к списку</button>
        </div>
      </div>
    `;

    this.parent.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.onBack());
    }
  }

  clear() {
    this.parent.innerHTML = '';
  }
}

export { UserPage };
