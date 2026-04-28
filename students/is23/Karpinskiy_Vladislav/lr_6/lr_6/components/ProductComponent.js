export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="card mx-auto" style="max-width: 500px;">

                <img src="${data.src}" class="card-img-top" alt="image">

                <div class="card-body text-center">

                    <h3 class="card-title">
                        ${data.title}
                    </h3>

                    <p class="card-text">
                        ${data.text}
                    </p>

                </div>
            </div>
        `
    }

    render(data) {
        this.parent.innerHTML = this.getHTML(data)
    }
}