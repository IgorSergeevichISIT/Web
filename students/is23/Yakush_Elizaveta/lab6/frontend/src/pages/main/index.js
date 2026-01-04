import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductPage } from "../product/Product";
export class MainPage {
    parent;
    users = []; // пользователи
    constructor(parent) {
        this.parent = parent;
        this.users = [];
    }
    get pageRoot() {
        const el = document.getElementById("main-page");
        if (!el)
            throw new Error("Main page root not found");
        return el;
    }
    getHTML() {
        return `
        <div style="text-align:center;margin-bottom:20px;">
            <button id="refresh-btn" class="btn btn-secondary mb-2">Подгрузить актуальные данные</button>
            <button id="add-user-btn" class="btn btn-info mb-2">Добавить пользователя</button>
            <select id="filter-select" class="form-control">
                <option value="all">Все</option>
                <option value="man">Мужчины</option>
                <option value="woman">Женщины</option>
            </select>
        </div>

        <div id="main-page"
             style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;">
        </div>
    `;
    }
    async getData(refresh = false) {
        try {
            const response = await fetch(`http://localhost:3000/api/members?refresh=${refresh}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            this.users = (await response.json());
            console.log(response);
            this.renderData(this.users);
        }
        catch (e) {
            console.error("Ошибка загрузки данных", e);
            this.pageRoot.innerHTML = `<p style="color:red;">Не удалось загрузить данные: ${e.message}</p>`;
        }
    }
    renderData(items) {
        this.pageRoot.innerHTML = "";
        if (!items || items.length === 0) {
            this.pageRoot.innerHTML = "<p>Нет пользователей для отображения</p>";
            return;
        }
        items.forEach(item => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(item, () => this.clickCard(item), // детали
            () => this.removeUser(item.id) // удаление
            );
        });
    }
    clickCard(user) {
        const productPage = new ProductPage(this.parent);
        productPage.render(user);
    }
    async addUser() {
        // форма для добавления пользователя
        const first_name = prompt("Имя пользователя");
        if (!first_name)
            return;
        const last_name = prompt("Фамилия пользователя") || "";
        const sexStr = prompt("Пол (муж, жен)") || "муж";
        const sex = sexStr.trim() === "жен" ? 1 : 2;
        const id = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 0;
        const newUser = { id, first_name, last_name, sex };
        const res = await fetch("http://localhost:3000/api/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });
        const data = await res.json();
        if (data.error) {
            alert("Ошибка: " + data.error);
        }
        else {
            this.getData();
        }
    }
    async removeUser(id) {
        if (!confirm("Удалить пользователя из списка?"))
            return;
        const res = await fetch("http://localhost:3000/api/removeUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id })
        });
        const data = await res.json();
        if (data.success) {
            this.getData();
        }
        else {
            alert("Ошибка: " + data.error);
        }
    }
    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        const addBtn = document.getElementById("add-user-btn");
        addBtn?.addEventListener("click", () => this.addUser());
        const refreshBtn = document.getElementById("refresh-btn");
        refreshBtn?.addEventListener("click", () => this.getData(true));
        const filterSelect = document.getElementById("filter-select");
        filterSelect?.addEventListener("change", async () => {
            const value = filterSelect.value.toLowerCase().trim();
            try {
                let items = [...this.users];
                if (value === "man")
                    items = items.filter(u => u.sex === 2);
                if (value === "woman")
                    items = items.filter(u => u.sex === 1);
                this.renderData(items);
            }
            catch (e) {
                console.error("Ошибка фильтрации данных", e);
                this.pageRoot.innerHTML = `<p style="color:red;">Ошибка фильтрации: ${e.message}</p>`;
            }
        });
        this.getData();
    }
}
