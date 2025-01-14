import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getHTML() {
        return `
            <div id="product-page" class="flex flex-col bg-white p-4">
                <div id="product-details" class="product-details"></div>
                <div id="back-button" class="back-button"></div>
            </div>`;
    }

    getData() {
        const proxyUrl = 'http://localhost:3000/proxy?url='; 
        
        const productUrl = urls.getUserInfo(this.id); 
        console.log('URL для продукта:', productUrl); 
    
        ajax.get(proxyUrl + encodeURIComponent(productUrl), (data) => {
            this.renderProduct(data.response[0]); 
        }); 
    }

    renderProduct(product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <h2>${product.first_name} ${product.last_name}</h2>
            <img src="${product.photo_400_orig}" alt="${product.first_name} ${product.last_name}" />
        `;
        
        const backButton = new BackButtonComponent(this.parent);
        backButton.render(this.goBack.bind(this)); 
    }

    goBack() {
        const mainPage = new MainPage(this.parent); 
        mainPage.render(); 
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData();
    }
}
