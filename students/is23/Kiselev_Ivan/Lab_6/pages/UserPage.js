import { api } from '../modules/api.js';
import { ProductComponent } from '../components/ProductComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';

export class UserPage {
  constructor(parent, userId, onBack) {
    this.parent = parent;
    this.userId = userId;
    this.onBack = onBack;
  }

  getHTML() {
    return `<div id="user-content"><p>Загрузка профиля...</p></div>`;
  }

  async render() {
    this.parent.innerHTML = this.getHTML();
    const contentContainer = this.parent.querySelector('#user-content');

    const backButton = new BackButtonComponent(this.parent);
    backButton.render(() => this.onBack());

    try {
      const user = await api.get(`/users/${this.userId}`);
      if (!user) {
        contentContainer.innerHTML = '<p>Пользователь не найден.</p>';
        return;
      }

      const userCard = new ProductComponent(contentContainer, async () => {
        if (confirm('Удалить этого пользователя?')) {
          try {
            await api.remove(`/users/${this.userId}`);
            this.onBack(); // back to main
          } catch (err) {
            alert('Ошибка удаления: ' + err.message);
          }
        }
      });
      userCard.render(user);
    } catch (error) {
      contentContainer.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    }
  }
}