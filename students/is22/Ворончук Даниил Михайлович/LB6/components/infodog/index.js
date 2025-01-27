export class InfoDogComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `     
                <div class="card mb-3">
                    <img src="${data.src}"" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">${data.info}</p>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}