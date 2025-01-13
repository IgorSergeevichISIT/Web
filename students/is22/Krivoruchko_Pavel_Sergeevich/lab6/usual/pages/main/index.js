import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {SortPanelComponent} from "../../components/sort-panel/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    async getData(mode, fromwhat) 
    {
        if(fromwhat==null)
        {
            ajax.get(`/groupINFO`, (data) => {
                this.renderData(data.response.items);
            });
        }
        else
        {
            ajax.get(`/new/group/${groupId}/members?sort=${mode}`, (data) => {
                this.renderData(data.response.items);
            });
        }
        
    }  

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(document.getElementById('main-page'));
            productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this)); //
        });
    }    

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    deleteCard(e) //
    {
        const cardId = e.target.dataset.id;
        ajax.post(`${urls.getLocalServer()[0]}/delete_user/${cardId}`)
        
        this.getData("",null);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();

        const sort = new SortPanelComponent(this.parent);
        sort.render(this.getData.bind(this));

        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData("",null);
        
    }
}