import { ajax } from '../modules/ajax.js';
import { urls } from '../modules/urls.js';
import { ProductComponent } from '../components/ProductComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';

export class UserPage {
  constructor(parent, userId, onBack) {
    this.parent = parent;
    this.userId = userId;
    this.onBack = onBack;
  }

  getHTML() {
    return `
      <div id="user-content">
        <p>Загрузка профиля...</p>
      </div>
    `;
  }

  async render() {
    this.parent.innerHTML = this.getHTML();
    const contentContainer = this.parent.querySelector('#user-content');

    const backButton = new BackButtonComponent(this.parent);
    backButton.render(() => this.onBack());

    try {
      const data = await ajax.post(urls.getUserInfo(this.userId));
      if (!data || data.error) {
        contentContainer.innerHTML = `<p style="color: red;">Ошибка загрузки: ${data?.error?.error_msg || 'Неизвестная ошибка'}</p>`;
        return;
      }

      const user = data.response?.[0];
      if (!user) {
        contentContainer.innerHTML = '<p>Пользователь не найден.</p>';
        return;
      }

      const userCard = new ProductComponent(contentContainer);
      userCard.render(user);
    } catch (error) {
      contentContainer.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
  }
}