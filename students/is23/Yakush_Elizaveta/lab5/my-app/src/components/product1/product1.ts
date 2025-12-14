export class ProductComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    getHTML(user: any): string {
        return `
        <div class="card" style="width: 300px; margin:0 auto; text-align:center;">
            <img src="${user.photo_200 || 'https://via.placeholder.com/200'}" 
                 alt="${user.first_name}" 
                 class="card-img-top" 
                 style="border-radius:50%; max-width:200px; margin: 10px auto;">
            <div class="card-body">
                <h3>${user.first_name} ${user.last_name}</h3>
                <p>ID: ${user.id}</p>
            </div>
        </div>`;
    }

    render(user: any): void {
        this.parent.innerHTML = this.getHTML(user);
    }
}
