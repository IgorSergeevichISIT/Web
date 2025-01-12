export class ProductCardComponent {
    private parent: HTMLElement;
  
    constructor(parent: HTMLElement) {
      this.parent = parent;
    }
  
    private getHTML(data: any): string {
      return (
        `<div class="card" style="width: 200px; margin: 15px auto; border: 5px solid black;">
            <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
            <div class="card-body">
                <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
            </div>
        </div>`
      );
    }
  
    private addListeners(data: any, listener: EventListener): void {
      document
        .getElementById(`click-card-${data.id}`)!
        .addEventListener('click', listener);
    }
  
    render(data: any, listener: EventListener): void {
      this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
      this.addListeners(data, listener);
    }
  }
  