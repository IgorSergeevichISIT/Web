export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    

    getHTML(data) {
    return (
        `
            <div class="card" style="width: 240px; text-align: center;">
                <img class="card-img-top" src="${data.conversation.chat_settings.photo.photo_200}">
                <div class="card-body">
                    <h5 class="card-title">${data.conversation.chat_settings.title} </h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.conversation.peer.id}">Нажми на меня</button>
                    <button class="btn btn-primary" style="margin-top: 10px;" id="delete-chat-${data.id}" data-id="${data.conversation.peer.id}">Очистить чат</button>
                    
                    <style>
                    [id^="delete-chat-"]:hover {
                    background-color: #b30000;
                    border-color: #b30000;
                            }
                    </style>
                </div>
            </div>
        `
    )
    

}
    addListenersClick(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }
    
    addListenersDelete(data, listener) {
        document
            .getElementById(`delete-chat-${data.id}`)
            .addEventListener("click", listener);
    }
    
    render(data, listenerClick, listenerDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListenersClick(data, listenerClick);
        this.addListenersDelete(data, listenerDelete);
    }
}