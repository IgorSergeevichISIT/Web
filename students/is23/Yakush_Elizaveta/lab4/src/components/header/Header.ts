export class HeaderComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    render(onHomeClick: () => void) {
        this.parent.insertAdjacentHTML(
            'beforeend',
            `<header style="display:flex;justify-content:flex-end;padding:10px;background:#f5f5f5;">
                <button id="home-btn" class="btn btn-primary">Домой</button>
            </header>`
        );

        const btn = document.getElementById('home-btn');
        btn?.addEventListener('click', onHomeClick);
    }
}
