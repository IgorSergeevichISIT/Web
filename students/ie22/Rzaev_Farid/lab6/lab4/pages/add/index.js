import {AddPageComponent} from "../../components/add/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { urls } from "../../modules/urls.js";
import { ajax } from "../../modules/ajax.js";

export class AddPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        
        this.renderData();

    }

    renderData(user) {
        const product = new AddPageComponent(this.pageRoot);
        product.render();
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>
        <button id = "add" class="btn btn-primary">Добавить</button>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
   
    addListener(listener) {
        document
            .getElementById(`add`)
            .addEventListener("click", listener);
    }
    clickAdd()
    {
        const url = document.getElementById('input1').value;
        const title = document.getElementById('input2').value;
        const text = document.getElementById('input3').value;
        if(!(url&&title&&text)) return;
        const data = {
            src: url,
            title: title,
            text: text
        };
        ajax.post(urls.addCard(),data);
        
        
    }
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
        this.addListener(this.clickAdd.bind(this));
        this.getData();
    }
}