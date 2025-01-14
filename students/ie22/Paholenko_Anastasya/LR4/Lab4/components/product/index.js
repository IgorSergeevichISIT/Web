export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4">
                <img class="w-full h-48 object-cover" src="${data.photo_400_orig}" alt="картинка">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">${data.first_name} ${data.last_name}</div>
                    <p class="text-gray-700 text-base"></p>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
