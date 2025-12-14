import { api } from '../modules/api.js';
import { ProductCardComponent } from '../components/ProductCardComponent.js';

export class MainPage {
  constructor(parent, onNavigateToUser) {
    this.parent = parent;
    this.onNavigateToUser = onNavigateToUser;
    this.currentSort = 'id_asc';
  }

  getHTML() {
    return `
      <div class="main-header">
        <h1>Участники группы</h1>
        <div class="sort-controls mb-3">
          <label for="sort-select">Сортировка:</label>
          <select id="sort-select" class="form-select" style="width: auto; display: inline-block; margin-left: 10px;">
            <option value="id_asc">По возрастанию</option>
            <option value="id_desc">По убыванию</option>
          </select>
        </div>
        <button id="add-user-btn" class="btn btn-success mb-3"> Добавить участника </button>
        <div id="cards-container" class="row"></div>
      </div>
    `;
  }

  render() {
    this.parent.innerHTML = this.getHTML();

    this.cardsContainer = this.parent.querySelector('#cards-container');
    const sortSelect = this.parent.querySelector('#sort-select');
    const addBtn = this.parent.querySelector('#add-user-btn');

    sortSelect.value = this.currentSort;
    sortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.loadMembers();
    });

    addBtn.addEventListener('click', () => this.showAddForm());

    this.loadMembers();
  }

  async loadMembers() {
    this.cardsContainer.innerHTML = '<p class="col-12">Загрузка...</p>';
    try {
      const users = await api.get('/users', { sort: this.currentSort });
      this.cardsContainer.innerHTML = '';
      if (users.length === 0) {
        this.cardsContainer.innerHTML = '<p class="col-12">Нет участников.</p>';
        return;
      }
      users.forEach(user => {
        const card = new ProductCardComponent(this.cardsContainer, () => {});
        card.render(user, (id) => this.onNavigateToUser(id));
      });
    } catch (error) {
      this.cardsContainer.innerHTML = `<p class="col-12 text-danger">Ошибка: ${error.message}</p>`;
    }
  }

  showAddForm() {
    const formHTML = `
      <div class="card mb-4">
        <div class="card-body">
          <h5>Добавить нового участника</h5>
          <div class="mb-2"><input type="text" id="first_name" class="form-control form-control-sm" placeholder="Имя" required></div>
          <div class="mb-2"><input type="text" id="last_name" class="form-control form-control-sm" placeholder="Фамилия" required></div>
          <div class="mb-2"><input type="text" id="photo_200" class="form-control form-control-sm" placeholder="URL аватара (опционально)"></div>
          <div class="mb-2"><input type="text" id="bdate" class="form-control form-control-sm" placeholder="Дата рождения (дд.мм.гггг)"></div>
          <div class="mb-2"><input type="text" id="domain" class="form-control form-control-sm" placeholder="Никнейм (без @)"></div>
          <button id="submit-user" class="btn btn-primary btn-sm">Создать</button>
          <button id="cancel-add" class="btn btn-secondary btn-sm ms-2">Отмена</button>
        </div>
      </div>
    `;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formHTML;
    const form = tempDiv.firstElementChild;
    this.cardsContainer.prepend(form);

    form.querySelector('#cancel-add').onclick = () => form.remove();
    form.querySelector('#submit-user').onclick = async () => {
      const firstName = form.querySelector('#first_name').value.trim();
      const lastName = form.querySelector('#last_name').value.trim();

      if (!firstName || !lastName) {
        alert('Имя и фамилия обязательны!');
        return;
      }

      
      const initial1 = firstName[0].toUpperCase();
      const initial2 = lastName[0].toUpperCase();
      const initials = initial1 + initial2;

      const colors = ['4A90E2', '50C878', 'FF6F61', 'FFA500', '9B59B6'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const customAvatar = form.querySelector('#photo_200').value.trim();
      const photoUrl = customAvatar || `https://placehold.co/200x200/${randomColor}/FFFFFF?text=${encodeURIComponent(initials)}`;

      const data = {
        first_name: firstName,
        last_name: lastName,
        photo_200: photoUrl,
        bdate: form.querySelector('#bdate').value.trim(),
        domain: form.querySelector('#domain').value.trim()
      };

      try {
        await api.post('/users', data);
        form.remove();
        this.loadMembers();
      } catch (err) {
        alert('Ошибка создания: ' + err.message);
      }
    };
  }
}