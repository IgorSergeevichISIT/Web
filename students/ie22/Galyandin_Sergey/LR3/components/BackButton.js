export class BackButton {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("home")
            .addEventListener("click", listener)
    }

}