export class SortPanelComponent {
    constructor(parent, handler) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
            <div class="mode_buttons" style="display: flex; justify-content: center; margin: 0 auto;">
                <button class="mode-button" style="width: 100px;" data-sort="id_asc">Режим 1</button>
                <button class="mode-button" style="width: 100px;" data-sort="id_desc">Режим 2</button>
                <button class="mode-button" style="width: 100px;" data-sort="time_asc">Режим 3</button>
                <button class="mode-button" style="width: 100px;" data-sort="time_desc">Режим 4</button>
            </div>
            `
        );
    }

    addListener(listener) {
        const buttons = this.parent.querySelectorAll('.mode-button');
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                document.getElementById('main-page').innerHTML = '';
                const sortMode = e.target.dataset.sort;
                listener(sortMode); // Передаем режим сортировки в обработчик
            });
        });
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListener(listener);
    }
}
