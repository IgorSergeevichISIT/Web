export let arr = [];
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(data) {
        return `
            <div class="card" style="width: 240px; text-align: center;">
                <img class="card-img-top" src="${data.conversation.chat_settings.photo.photo_200}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.conversation.chat_settings.title}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
        `;
    }
    addListeners(data, listener) {
        var _a;
        (_a = document
            .getElementById(`click-card-${data.id}`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", listener);
    }
    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
        arr.push(data.conversation.peer.id);
        console.log(data.id);
    }
}
