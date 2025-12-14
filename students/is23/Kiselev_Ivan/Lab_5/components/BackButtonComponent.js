export class BackButtonComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <button id="back-button" class="btn btn-secondary" style="margin-bottom: 20px;">
        ← Назад к списку
      </button>
    `;
  }

  render(clickHandler) {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('afterbegin', html);

    const button = document.getElementById('back-button');
    if (button && clickHandler) {
      button.addEventListener('click', clickHandler);
    }
  }
}