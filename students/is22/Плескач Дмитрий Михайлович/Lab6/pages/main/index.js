import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.members = [];
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id="asd" class="d-flex flex-column">
                <div class="filter-container">
                    <input type="text" id="search-input" placeholder="Поиск по имени..." />
                    <select id="sort-type" class="select-primary">
                        <option value="none">Без сортировки</option>
                        <option value="id-asc">ID по возрастанию</option>
                        <option value="id-desc">ID по убыванию</option>
                        <option value="name-asc">Имя (по алфавиту)</option>
                        <option value="name-desc">Имя (обратно алфавиту)</option>
                    </select>
                    <button id="apply-filter" class="btn-btn-primary">Применить фильтр</button>
                </div>
                <div id="member-list" class="member-list d-flex flex-wrap"></div>
            </div>
        `;
    }
    

    fetchMembers() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.members = data.response.items;
            this.renderMembers(this.members);
        });
    }

    filterMembers() {
        const searchInput = document.getElementById("search-input").value.toLowerCase();
        const sortType = document.getElementById("sort-type").value;

        let filteredMembers = this.members.filter(
            (member) =>
                member.first_name.toLowerCase().includes(searchInput) ||
                member.last_name.toLowerCase().includes(searchInput)
        );

        switch (sortType) {
            case "id-asc":
                filteredMembers.sort((a, b) => a.id - b.id);
                break;
            case "id-desc":
                filteredMembers.sort((a, b) => b.id - a.id);
                break;
            case "name-asc":
                filteredMembers.sort((a, b) =>
                    a.first_name.localeCompare(b.first_name, "ru")
                );
                break;
            case "name-desc":
                filteredMembers.sort((a, b) =>
                    b.first_name.localeCompare(a.first_name, "ru")
                );
                break;
        }

        this.renderMembers(filteredMembers);
    }

    renderMembers(items) {
        const memberList = document.getElementById("member-list");
        memberList.innerHTML = "";

        items.forEach((item) => {
            const productCard = new ProductCardComponent(memberList);
            productCard.render(item, this.clickMemberCard.bind(this));
        });
    }

    clickMemberCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        this.fetchMembers();

        const filterButton = document.getElementById("apply-filter");
        filterButton.addEventListener("click", () => this.filterMembers());
    }
}
