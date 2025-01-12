export class BackButtonComponent {
    private parent: HTMLElement;
  
    constructor(parent: HTMLElement) {
      this.parent = parent;
    }
  
    private addListeners(listener: EventListener): void {
      document
        .getElementById('back-button')!
        .addEventListener('click', listener);
    }
  
    private getHTML(): string {
      return (
        `<button id="back-button" class="btn btn-primary" type="button">Назад</button>`
      );
    }
  
    render(listener: EventListener): void {
      this.parent.insertAdjacentHTML('beforeend', this.getHTML());
      this.addListeners(listener);
    }
  }
  