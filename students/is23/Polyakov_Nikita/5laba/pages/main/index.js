import { buildVkUrl } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import ProductCardComponent from "../../components/product-card/index.js";
import SortComponent from "../../components/sort-component/index.js";

class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = null;
        this.allUsers = [];
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div class="cyber-header">
                    <h1>Список участников</h1>
                </div>
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

    // Внутри loadMembers:
    async loadMembers() {
    try {
        const { url, params } = buildVkUrl('groups.getMembers', {
            group_id: groupId,
            fields: 'photo_400'
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(params)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data?.response?.items) {
            this.allUsers = data.response.items;
            this.renderData(this.allUsers, 'id_asc');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        this.pageRoot.innerHTML = `<p class="text-danger">Ошибка: ${error.message}</p>`;
    }
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