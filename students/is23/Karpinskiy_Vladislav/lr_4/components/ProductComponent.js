export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="card mb-3 mx-auto" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.photo_400_orig}" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">
                                ${data.first_name} ${data.last_name}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    render(data) {
        this.parent.innerHTML = this.getHTML(data)
    }
}