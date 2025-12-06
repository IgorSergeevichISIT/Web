import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import ProductCardComponent from "../../components/product-card/index.js";
import SortComponent from "../../components/sort-component/index.js";

class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = null;
        this.allUsers = []; // храним всех пользователей
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1>Участники группы</h1>
                <div id="sort-container"></div>
                <div id="cards-container" class="row row-cols-1 row-cols-md-3 g-4"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.pageRoot = document.getElementById('cards-container');
        const sortContainer = document.getElementById('sort-container');

        new SortComponent(sortContainer).render((sort) => {
            this.renderData(this.allUsers, sort);
        });

        this.loadMembers();
    }

    loadMembers() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
        if (data?.response?.items) {
            console.log("Загружено участников:", data.response.items.length);
            this.allUsers = data.response.items;
            this.renderData(this.allUsers, 'id_asc');
        }
    });
}

    renderData(users, sort = 'id_asc') {
    
    let sorted = [...users];
    if (sort === 'name_asc') {
        sorted.sort((a, b) => (a.last_name + a.first_name).localeCompare(b.last_name + b.first_name));
    } else if (sort === 'name_desc') {
        sorted.sort((a, b) => (b.last_name + b.first_name).localeCompare(a.last_name + a.first_name));
    } else if (sort === 'id_desc') {
        sorted.sort((a, b) => b.id - a.id);
    } else {
        sorted.sort((a, b) => a.id - b.id);
    }

    
    this.pageRoot.innerHTML = '';

    
    sorted.forEach(user => {
        const card = new ProductCardComponent(this.pageRoot);
        card.render(user, (id) => window.location.hash = `#user/${id}`);
    });
}
}

export default MainPage;