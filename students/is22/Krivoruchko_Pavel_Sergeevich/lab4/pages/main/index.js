import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
import {SortComponent} from "../../components/sort/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.sort = 'id_asc'; // Значение сортировки по умолчанию
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getData() {
        ajax.post(urls.getGroupMembers(groupId) + `&sort=${this.sort}`, (data) => {
            this.renderData(data.response.items);
        });
    }    

    renderData(items) {
        this.pageRoot.innerHTML = ''; // Очищаем старые данные
    
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }    

    clickCard(e) {
        const cardId = e.target.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    handleSortChange(newSort) {
        this.sort = newSort; // Обновляем сортировку
        this.getData(); // Повторно загружаем данные с новой сортировкой
    }

    render() {
        this.parent.innerHTML = ''; // Очистка контейнера
    
        // Сначала рендерим компонент сортировки
        const sortComponent = new SortComponent(this.parent, this.handleSortChange.bind(this));
        sortComponent.render();
    
        // Затем рендерим контейнер для списка пользователей
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        // Загружаем данные
        this.getData();
    }
}