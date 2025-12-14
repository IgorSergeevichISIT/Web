export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

    getHTML(data) {
    const photoUrl = data.photo_200 || data.photo_max_orig || 'https://vk.com/images/camera_400.png';
    return `
        <div class="card" style="width: 300px; margin: 10px; display: inline-block;">
        <img class="card-img-top" src="${photoUrl}" alt="Аватар" style="height: 300px; object-fit: cover;">
        <div class="card-body">
            <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
            <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">
            Открыть профиль
            </button>
        </div>
        </div>
    `;
    }

  render(data, clickHandler) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML('beforeend', html);
    
    const button = this.parent.querySelector(`#click-card-${data.id}`);
    if (button && clickHandler) {
      button.addEventListener('click', () => clickHandler(data.id));
    }
  }
}