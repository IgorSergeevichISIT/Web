import { ajax } from '../modules/ajax.js';
import { urls } from '../modules/urls.js';
import { groupId } from '../modules/consts.js';
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
      <div class="sort-controls">
        <label for="sort-select">Сортировка:</label>
        <select id="sort-select" class="form-select" style="width: auto; display: inline-block; margin-left: 10px;">
          <option value="id_asc">По ID (возрастание)</option>
          <option value="id_desc">По ID (убывание)</option>
          <option value="time_asc">По дате вступления (сначала старые)</option>
          <option value="time_desc">По дате вступления (сначала новые)</option>
        </select>
      </div>
    </div>
    <div id="cards-container" style="display: flex; flex-wrap: wrap;"></div>
  `;
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.innerHTML = this.getHTML();

    this.cardsContainer = this.parent.querySelector('#cards-container');

    const sortSelect = this.parent.querySelector('#sort-select');
    sortSelect.value = this.currentSort;
    sortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.loadMembers(); 
    });

    this.loadMembers();
  }

  // pages/MainPage.js
  loadMembers() {
    this.cardsContainer.innerHTML = '<p>Загрузка...</p>';

    // Шаг 1: получаем только ID участников
    ajax.post(urls.getGroupMembersIdsOnly(groupId, this.currentSort), (data) => {
      if (!data || data.error) {
        this.showError(data);
        return;
      }

      const userIds = data.response.items; // это массив ID
      if (!userIds || userIds.length === 0) {
        this.cardsContainer.innerHTML = '<p>Нет участников.</p>';
        return;
      }

      // Шаг 2: получаем полные данные (включая фото)
      ajax.post(urls.getUsersByIds(userIds), (userData) => {
        if (!userData || userData.error) {
          this.showError(userData);
          return;
        }

        const users = userData.response || [];
        this.cardsContainer.innerHTML = '';
        users.forEach((user) => {
          const card = new ProductCardComponent(this.cardsContainer);
          card.render(user, (id) => this.onNavigateToUser(id));
        });
      });
    });
  }
}