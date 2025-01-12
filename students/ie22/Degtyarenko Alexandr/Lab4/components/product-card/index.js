export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
        this.renderHeader();
    }

    renderHeader() {
        if (!document.querySelector('.header')) {
            const headerHTML = 
            `
                <div class="header" style="width: 100vw; text-align: center; padding: 15px; background: linear-gradient(135deg,rgb(124, 45, 188),rgb(250, 150, 73)); color: white; font-family: 'Courier New', Courier, monospace;">
                    <h1 style="margin: 0; font-size: 3em;">Lobby</h1>
                </div>
            `
            this.parent.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px; background: black; color: white; border: none; border-radius: 50px; ">
                    <div class="card-header" style="background: linear-gradient(135deg,rgb(114, 114, 114), #000000); color: #FFD700; text-align: center; padding: 10px; font-family: 'Arial', sans-serif;">
                        ID: ${data.id}
                    </div>
                    <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                    <div class="card-body" style="text-align: center;">
                        <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}"style="background: linear-gradient(135deg,rgb(150, 213, 184), #FFD700); color: black; font-family: 'Arial', sans-serif; border: none; border-radius: 20px; padding: 10px 20px; cursor: help;">Выбрать</button>
                    </div>
                </div>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}