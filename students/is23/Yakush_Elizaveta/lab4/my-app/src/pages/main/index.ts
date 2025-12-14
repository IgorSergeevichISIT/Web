import { ProductCardComponent } from "../../components/product-card/product-card.ts";
import { ProductPage } from "../product/Product.ts";
import { HeaderComponent } from "../../components/header/Header";
import { ajax } from "../../modules/ajax";
import { urls } from "../../modules/urls";
import { groupId } from "../../modules/consts";

// Тип пользователя VK
interface User {
    id: number;
    first_name: string;
    last_name: string;
    photo_200?: string;
    sex?: number;
    [key: string]: any; // на случай дополнительных полей
}

export class MainPage {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private get pageRoot(): HTMLElement {
        const el = document.getElementById("main-page");
        if (!el) throw new Error("Main page root not found");
        return el;
    }

    private getHTML(): string {
        return `
            <div style="margin-bottom:20px; text-align:center;">
                <input id="filter-input" type="text" class="form-control" placeholder="Фильтр: man / woman">
            </div>
            <div id="main-page" style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;"></div>
        `;
    }

    private getData(): void {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.renderData(data.response.items as User[]);
        });
    }

    private renderData(items: User[]): void {
        this.pageRoot.innerHTML = "";
        if (!items || items.length === 0) {
            this.pageRoot.innerHTML = "<p>Нет пользователей для отображения</p>";
            return;
        }

        items.forEach(item => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(item, () => this.clickCard(item));
        });
    }

    private clickCard(user: User): void {
        const productPage = new ProductPage(this.parent);
        productPage.render(user);
    }

    render(): void {
        this.parent.innerHTML = "";

        const header = new HeaderComponent(this.parent);
        header.render(() => this.render());

        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const filterInput = document.getElementById("filter-input") as HTMLInputElement;

        filterInput?.addEventListener("input", () => {
            const value = filterInput.value.toLowerCase().trim();

            ajax.post(urls.getGroupMembers(groupId), (data) => {
                let items = data.response.items as User[];

                // фильтруем локально по полу
                if (value === "man") {
                    items = items.filter((u: User) => u.sex === 2); // мужчины
                } else if (value === "woman") {
                    items = items.filter((u: User) => u.sex === 1); // женщины
                }

                this.renderData(items);
            });
        });

        this.getData();
    }
}
