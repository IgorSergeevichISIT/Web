class AddUserModal {
  constructor(parentSelector, onAddUser) {
    this.parent = document.querySelector(parentSelector);
    this.onAddUser = onAddUser;
    this.isOpen = false;
  }

  render() {
    const html = `
      <div id="add-user-modal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Добавить нового пользователя</h2>
            <button class="modal-close" id="modal-close">&times;</button>
          </div>
          
          <form id="add-user-form" class="form">
            <div class="form-group">
              <label for="first_name">Имя *</label>
              <input 
                type="text" 
                id="first_name" 
                name="first_name" 
                placeholder="Введите имя"
                required
              >
            </div>

            <div class="form-group">
              <label for="last_name">Фамилия *</label>
              <input 
                type="text" 
                id="last_name" 
                name="last_name" 
                placeholder="Введите фамилию"
                required
              >
            </div>

            <div class="form-group">
              <label for="bdate">День рождения</label>
              <input 
                type="text" 
                id="bdate" 
                name="bdate" 
                placeholder="ДД.М или пусто"
              >
            </div>

            <div class="form-group">
              <label for="about">О себе</label>
              <textarea 
                id="about" 
                name="about" 
                placeholder="Расскажите о себе"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="photo_200_orig">Ссылка на фото</label>
              <input 
                type="url" 
                id="photo_200_orig" 
                name="photo_200_orig" 
                placeholder="https://..."
              >
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" id="modal-cancel">Отмена</button>
              <button type="submit" class="btn btn-primary">Добавить</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.parent.insertAdjacentHTML('afterbegin', html);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const modal = document.getElementById('add-user-modal');
    const form = document.getElementById('add-user-form');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');

    if (!modal || !form || !closeBtn || !cancelBtn) {
      console.error('❌ Ошибка: Не найдены элементы модали');
      return;
    }

    closeBtn.addEventListener('click', () => this.close());
    cancelBtn.addEventListener('click', () => this.close());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.close();
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const form = document.getElementById('add-user-form');
    const formData = new FormData(form);
    
    const userData = {
      first_name: formData.get('first_name').trim(),
      last_name: formData.get('last_name').trim(),
      bdate: formData.get('bdate') || null,
      about: formData.get('about') || '',
      photo_200_orig: formData.get('photo_200_orig') || 'https://via.placeholder.com/200'
    };

    if (!userData.first_name || !userData.last_name) {
      alert('Заполните имя и фамилию!');
      return;
    }

    this.onAddUser(userData);
    form.reset();
    this.close();
  }

  open() {
    const modal = document.getElementById('add-user-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.isOpen = true;
    }
  }

  close() {
    const modal = document.getElementById('add-user-modal');
    if (modal) {
      modal.classList.add('hidden');
      this.isOpen = false;
    }
  }
}

export { AddUserModal };
