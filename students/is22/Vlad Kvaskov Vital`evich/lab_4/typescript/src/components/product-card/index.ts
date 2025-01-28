export let arr: number[] = [];

export class ProductCardComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(data: { conversation: { chat_settings: { title: string; photo: { photo_200: string } }; peer: { id: number } }; id: number }): string {
        return `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.conversation.chat_settings.photo.photo_200}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.conversation.chat_settings.title}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
        `;
    }

    private addListeners(data: { id: number }, listener: EventListener): void {
        document
            .getElementById(`click-card-${data.id}`)
            ?.addEventListener("click", listener);
    }

    public render(data: { conversation: { chat_settings: { title: string; photo: { photo_200: string } }; peer: { id: number } }; id: number }, listener: EventListener): void {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
        arr.push(data.conversation.peer.id);
        console.log(data.id);
    }
}