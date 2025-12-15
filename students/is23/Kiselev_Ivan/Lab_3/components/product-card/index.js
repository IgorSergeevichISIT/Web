export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px;">
                <img class="card-img-top" src="${data.src}" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" data-uid="${data.uid}" data-action="detail">Подробнее</button>
                        <button class="btn btn-outline-secondary btn-sm" data-uid="${data.uid}" data-action="action">${data.actionText}</button>
                        <button class="btn btn-outline-danger btn-sm" data-uid="${data.uid}" data-action="remove">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, detailListener, actionListener, removeListener) {
        const buttons = this.parent.querySelectorAll(`[data-uid="${data.uid}"]`);
        buttons.forEach(btn => {
            const action = btn.dataset.action;
            if (action === 'detail') {
                btn.addEventListener('click', detailListener);
            } else if (action === 'action') {
                btn.addEventListener('click', actionListener);
            } else if (action === 'remove') {
                btn.addEventListener('click', removeListener);
            }
        });
    }

    render(data, detailListener, actionListener, removeListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, detailListener, actionListener, removeListener);
    }
}