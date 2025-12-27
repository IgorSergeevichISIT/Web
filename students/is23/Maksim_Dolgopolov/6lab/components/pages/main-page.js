import { ImageGallery } from "../images/image.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div id="main-page"></div>
        `;
    }

    render() {
        
        this.parent.innerHTML = '';
        
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        
        const galleryContainer = document.getElementById('main-page');
        
        
        const imageGallery = new ImageGallery(galleryContainer);
        imageGallery.render();
    }
}