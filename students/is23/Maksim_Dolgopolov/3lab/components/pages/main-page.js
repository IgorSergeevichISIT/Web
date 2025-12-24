import { ButtonGroup } from "../buttons/button-group.js";
import { Image } from "../images/image.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page"></div>
        `;
    }

    clickPic(e) {
        const buttonId = e.target.dataset.id || e.target.id.replace('click-', '');
        
        const imageContainer = this.parent.querySelector('.image-container');
        if (imageContainer) {
            imageContainer.remove();
        }

        const image = new Image(this.parent, buttonId);
        image.render();
    }

    render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const buttonGroup = new ButtonGroup(this.pageRoot);
    buttonGroup.render(this.clickPic.bind(this));
    }
}
