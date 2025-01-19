import { ProductCardComponent } from "../../components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";
import { groupId } from "../../modules/consts.js";
import { ProductPage } from "../product/index.js";
import { FilterComponent } from "../../components/filter/FilterComponent.js"; // Импортируем новый компонент

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.members = [];
        this.filteredMembers = [];
    }

    getHTML() {
        return `
            <div id="main-page" class="flex flex-col bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen p-4">
                <div class="header w-full text-center p-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-lg">
                    <h1 class="text-4xl font-bold">Участники сообщества "н"</h1>
                </div>
                <div id="filter-container"></div>
                <div id="member-list" class="member-list flex flex-wrap justify-center mt-4"></div>
            </div>`;
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.getData();
        this.initFilter();
    }

    getData() {
        const proxyUrl = 'http://localhost:3000/proxy?url=';
        const groupMembersUrl = urls.getGroupMembers(groupId);
        console.log('URL для участников группы:', groupMembersUrl);
        
        ajax.get(proxyUrl + encodeURIComponent(groupMembersUrl), (data) => {
            this.members = data.response.items;
            this.filteredMembers = this.members; // Изначально все участники
            this.renderMembers();
        });
    }

    renderMembers() {
        const memberList = document.getElementById('member-list');
        memberList.innerHTML = '';

        this.filteredMembers.forEach(member => {
            const productCard = new ProductCardComponent(memberList);
            productCard.render(member, this.clickMemberCard.bind(this, member.id), this.deleteMemberCard.bind(this, member.id));
        });
    }

    initFilter() {
        const filterContainer = document.getElementById('filter-container');
        const filterComponent = new FilterComponent(filterContainer);
        filterComponent.render(this.filterMembers.bind(this));
    }

    filterMembers(filterType) {
        this.filteredMembers = this.members.sort((a, b) => {
            const nameA = a[filterType].toLowerCase();
            const nameB = b[filterType].toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        this.renderMembers();
    }

    clickMemberCard(memberId) {
        const productPage = new ProductPage(this.parent, memberId);
        productPage.render();
    }

    deleteMemberCard(memberId) {
        // Удаляем участника из массива
        this.filteredMembers = this.filteredMembers.filter(member => member.id !== memberId);
        this.members = this.members.filter(member => member.id !== memberId);
        this.renderMembers();
    }
}