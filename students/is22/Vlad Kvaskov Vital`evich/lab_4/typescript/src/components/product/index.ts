export class ProductComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(data: { chat_settings: { title: string; members_count: number; photo?: { photo_200?: string } } }): string {
        return `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <div class="card" style="width: 400px; text-align: center;">
                    <img class="card-img-top" 
                         src="${data.chat_settings.photo?.photo_200 || 'default-image.jpg'}" 
                         alt="Chat Photo" 
                         style="max-width: 100%; height: auto; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${data.chat_settings.title}</h5>
                        <h5 class="card-title">Число участников: ${data.chat_settings.members_count}</h5>
                    </div>
                </div>
            </div>
        `;
    }
    
    public render(data: { chat_settings: { title: string; members_count: number; photo?: { photo_200?: string } } }): void {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
    
}