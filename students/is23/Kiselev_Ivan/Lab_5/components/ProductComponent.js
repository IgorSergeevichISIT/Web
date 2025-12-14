export class ProductComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    const photoUrl = data.photo_200 || 'https://vk.com/images/camera_400.png';

    // Обработка даты рождения
    let birthDate = 'Не указано';
    if (data.bdate) {
      const parts = data.bdate.split('.');
      if (parts.length === 3) {
        birthDate = `${parts[0]}.${parts[1]}.${parts[2]}`; // полная дата
      } else if (parts.length === 2) {
        birthDate = `${parts[0]}.${parts[1]}`; // только день и месяц
      }
    }

    // никнейм
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
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render(data) {
    const html = this.getHTML(data);
    this.parent.innerHTML = html;
  }
}