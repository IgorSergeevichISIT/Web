export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
      
        <div style="padding-left: 20px;"> 
                    <img src="${data.src}" style="display: block; margin: 0 auto; max-width: 100%; height: auto; margin-top: 20px;"><br>
                    <p> ${data.text}</p>
        </div>
        `
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
