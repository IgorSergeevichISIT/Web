export class SortPanelComponent {
    private parent: HTMLElement;
  
    constructor(parent: HTMLElement) {
      this.parent = parent;
    }
  
    private getHTML(): string {
      return (
        `<div class="mode_buttons" style="display: flex; justify-content: center; margin: 0 auto;">
            <button class="mode-button" style="width: 100px;" data-sort="id_asc">Режим 1</button>
            <button class="mode-button" style="width: 100px;" data-sort="id_desc">Режим 2</button>
            <button class="mode-button" style="width: 100px;" data-sort="time_asc">Режим 3</button>
            <button class="mode-button" style="width: 100px;" data-sort="time_desc">Режим 4</button>
        </div>`
      );
    }
  
    private addListener(listener: (mode: string) => void): void {
      const buttons = this.parent.querySelectorAll('.mode-button');
      buttons.forEach((button) => {
        button.addEventListener('click', (e: Event) => {
          const target = e.target as HTMLButtonElement;
          const sortMode = target.dataset.sort || '';
          document.getElementById('main-page')!.innerHTML = '';
          listener(sortMode);
        });
      });
    }
  
    render(listener: (mode: string) => void): void {
      this.parent.insertAdjacentHTML('beforeend', this.getHTML());
      this.addListener(listener);
    }
  }
  