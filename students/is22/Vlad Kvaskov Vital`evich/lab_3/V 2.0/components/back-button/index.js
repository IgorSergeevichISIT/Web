export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `   
            <div style="padding-left: 15px; margin-top: -15px;">
               <button id="back-button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 mt-4" type="button">
                          Назад
               </button>
            </div>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}