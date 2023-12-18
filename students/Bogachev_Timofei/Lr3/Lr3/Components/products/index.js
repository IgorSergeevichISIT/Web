export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <div class="card mb-3" style="width: 1500px;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid" alt="картинка">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body ">
                            <h2 class="card-title text1" style = "">${data.title}</h2>
                            <p class="card-text text2">${data.text}</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }
    

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}