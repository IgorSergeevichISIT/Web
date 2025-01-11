export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(data) {
        return (
            `
            <div style="margin-right: 10px;"> 
                <div class="card bcard" style="display: flex; width: 15vw; height: 15vw; border-color: #d8d8d8; background-image: url(${data.photo_400_orig}); background-size: cover;">
                    <div class="card-body" style="background-color: rgba(0, 0, 0, 0.5); border-radius: 6px; bottom: 0; height: 25%; position: absolute; width: 100%;">
                        <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    </div>
                        
                </div>
                <div class="btn-group"><button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
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