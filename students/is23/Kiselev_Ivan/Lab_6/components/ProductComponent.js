export class ProductComponent {
  constructor(parent, onDelete) {
    this.parent = parent;
    this.onDelete = onDelete;
  }

  getHTML(data) {
    const photoUrl = data.photo_200 || 'https://vk.com/images/camera_400.png';
    let birthDate = 'Не указано';
    if (data.bdate) {
      const parts = data.bdate.split('.');
      birthDate = parts.length >= 2 ? `${parts[0]}.${parts[1]}` + (parts[2] ? `.${parts[2]}` : '') : data.bdate;
    }
    const nickname = data.domain ? `@${data.domain}` : 'Не указано';

    return `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${photoUrl}" class="img-fluid rounded-start" alt="Аватар">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
              <p class="card-text"><strong>ID:</strong> ${data.id}</p>
              <p class="card-text"><strong>Никнейм:</strong> ${nickname}</p>
              <p class="card-text"><strong>Дата рождения:</strong> ${birthDate}</p>
              <button class="btn btn-danger btn-sm"> Удалить</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render(data) {
    const html = this.getHTML(data);
    this.parent.innerHTML = html;
    this.parent.querySelector('.btn-danger').onclick = this.onDelete;
  }
}