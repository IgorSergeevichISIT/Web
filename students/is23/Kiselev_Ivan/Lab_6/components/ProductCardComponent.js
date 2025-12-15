import { api } from '../modules/api.js';

export class ProductCardComponent {
  constructor(parent, onUserDeleted) {
    this.parent = parent;
    this.onUserDeleted = onUserDeleted;
  }

  getHTML(user) {
    const photoUrl = user.photo_200 || 'https://vk.com/images/camera_400.png';
    return `
      <div class="col-md-4 mb-4">
        <div class="card" style="width: 18rem;">
          <img src="${photoUrl}" class="card-img-top" alt="Аватар" style="height: 180px; object-fit: cover;">
          <div class="card-body">
            <h6 class="card-title">${user.first_name} ${user.last_name}</h6>
            <p class="card-text">ID: ${user.id}</p>
            <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${user.id}">Удалить</button>
          </div>
        </div>
      </div>
    `;
  }

  render(user, onNavigate) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getHTML(user);
    const card = wrapper.firstElementChild;
    
    card.querySelector('.card').addEventListener('click', (e) => {
      if (!e.target.closest('.delete-btn')) {
        onNavigate(user.id);
      }
    });

    card.querySelector('.delete-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`Удалить пользователя ${user.first_name} ${user.last_name}?`)) {
        try {
          await api.remove(`/users/${user.id}`);
          card.remove();
          if (this.onUserDeleted) this.onUserDeleted(user.id);
        } catch (err) {
          alert('Ошибка удаления: ' + err.message);
        }
      }
    });

    this.parent.appendChild(card);
  }
}