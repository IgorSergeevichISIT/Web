export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(data) {
        return (
            `
            <div> 
                <div class="card bcard" style="width: 500px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                    </div>
                        
                </div>
                <div class="btn-group">
                            <a href="#" class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее об акции</a>
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