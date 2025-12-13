class UserCard {
  constructor(parentSelector, onUserClick, onDeleteClick) {
    this.parent = document.querySelector(parentSelector);
    this.onUserClick = onUserClick;
    this.onDeleteClick = onDeleteClick;
  }

  renderUser(user) {
    const photoUrl = user.photo_400_orig || user.photo_200_orig || user.photo_100 || user.photo_50 || '';
    
    const html = `
      <div class="user-card" data-user-id="${user.id}">
        <div class="card-image">
          <img src="${photoUrl}" alt="${user.first_name} ${user.last_name}" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${user.first_name} ${user.last_name}</h3>
          ${user.about ? `<p class="card-description">${user.about}</p>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn-card view-btn" data-user-id="${user.id}">
            Подробнее
          </button>
          <button class="btn-card delete-btn" data-user-id="${user.id}">
            Удалить
          </button>
        </div>
      </div>
    `;

    this.parent.insertAdjacentHTML('beforeend', html);
  }

  attachEventListeners() {
    this.parent.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-btn')) {
        const userId = parseInt(e.target.dataset.userId, 10);
        this.onUserClick(userId);
      }

      if (e.target.classList.contains('delete-btn')) {
        const userId = parseInt(e.target.dataset.userId, 10);
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
          this.onDeleteClick(userId);
        }
      }
    });
  }

  clear() {
    this.parent.innerHTML = '';
  }
}

export { UserCard };
