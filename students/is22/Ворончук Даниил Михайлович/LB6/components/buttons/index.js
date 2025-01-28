export class Buttons {
    constructor(parent, id, text) {
        this.parent = parent;
        this.id = id
        this.text = text
    }


    getHTML(id, text) {
        return (
            `
                <button id="${id}" class="btn btn-primary" type="button">${text}</button>
            `
        )
    }

    render(/*listener*/) {
        const html = this.getHTML(this.id, this.text)
        this.parent.insertAdjacentHTML('beforeend', html)
        //this.addListeners(listener)
    }
}