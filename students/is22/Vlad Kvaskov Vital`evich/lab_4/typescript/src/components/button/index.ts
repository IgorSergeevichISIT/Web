export class ButtonComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    public render(): void {
        this.parent.insertAdjacentHTML('beforeend',
            '<button type="button" class="btn btn-primary">Hello, World 4!</button>');
    }
}