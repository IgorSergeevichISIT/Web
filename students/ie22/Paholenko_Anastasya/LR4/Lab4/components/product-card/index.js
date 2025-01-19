export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
        this.renderHeader();
        this.setBackground();
    }

    setBackground() {
        this.parent.classList.add('bg-gradient-to-r', 'from-blue-900', 'to-blue-400', 'flex', 'flex-wrap', 'justify-center', 'p-5', 'min-h-screen');
    }

    renderHeader() {
    if (!document.querySelector('.header')) {
        const headerHTML = `
            <div class="header w-full text-center p-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-lg">
                <h1 class="text-3xl font-bold">Участники сообщества "н"</h1>
            </div>
        `;
        this.parent.insertAdjacentHTML('afterbegin', headerHTML);
    }
}

getHTML(data) {
    return `
        <div class="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-purple-600 text-white transition-transform transform hover:scale-105">
            <div class="bg-gradient-to-r from-purple-500 to-black text-yellow-300 text-center p-2">
                ID: ${data.id}
            </div>
            <img class="w-full h-48 object-cover" src="${data.photo_400_orig}" alt="картинка">
            <div class="p-4 text-center">
                <h5 class="text-lg font-semibold">${data.first_name} ${data.last_name}</h5>
                <button class="bg-gradient-to-r from-blue-500 to-yellow-500 text-black font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-blue-600" id="click-card-${data.id}" data-id="${data.id}">Выбрать</button>
            </div>
        </div>
    `;
}

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
