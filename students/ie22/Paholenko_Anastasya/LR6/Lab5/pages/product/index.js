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
            <div id="product-page" class="flex flex-col bg-gradient-to-r from-blue-900 to-blue-400 p-4 min-h-screen"> 
                <div id="product-details" class="product-details"></div>
                <div id="back-button-container" class="back-button"></div>
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
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"> 
                <h2 class="text-3xl font-bold mb-4 text-center">${product.first_name} ${product.last_name}</h2> 
                <div class="flex justify-center mb-4">
                    <img class="w-45 h-45 object-cover rounded-lg" src="${product.photo_400_orig}" alt="${product.first_name} ${product.last_name}" /> 
                </div>
                <div class="text-center">
                    <p class="text-gray-600">ID: ${product.id}</p>
                </div>
            </div>
            <div id="back-button-container" class="mt-4 text-center"></div> 
        `;
        
        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
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