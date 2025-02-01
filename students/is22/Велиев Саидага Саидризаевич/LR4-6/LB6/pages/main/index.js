import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { groupId } from "../../modules/consts.js";
import { SortPanelComponent } from "../../components/sort-panel/index.js";
import { urls } from "../../modules/urls.js";
import { ReturnBackChooserComponent } from "../../components/return-back-chooser/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap"></div>
        `;
    }

    async getData(mode, fromwha) 
    {
        if(fromwha==null)
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
            productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    deleteCard(e)
    {
        const cardId = e.target.dataset.id;
        ajax.post(`${urls.getLocalServer()[0]}/delete_user/${cardId}`)
        
        this.getData("",null);
    }

    addReturnCard(selectedUserId)
    {
        ajax.post(`${urls.getLocalServer()[0]}/return_user/${selectedUserId}`)
        
        this.getData("",null);
    }

    async getDeletedIdFromServer()
    {
        try {
            const response = await fetch(`${urls.getLocalServer()[0]}/all_deleted_id`);
            
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            return { error: error.message };
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();

        const sort = new SortPanelComponent(this.parent);
        sort.render(this.getData.bind(this));

        const returnBack = new ReturnBackChooserComponent(this.parent);
        this.getDeletedIdFromServer().then(deletedId => {
            returnBack.render(deletedId, this.addReturnCard.bind(this)); // Передаем полученные данные в компонент

            this.parent.insertAdjacentHTML('beforeend', html);
            this.getData("",null);
        });

        
        
    }
}
