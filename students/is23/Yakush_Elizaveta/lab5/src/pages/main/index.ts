import { ProductCardComponent } from "../../components/product-card/product-card.ts";
import { ProductPage } from "../product/Product.ts";
import { urls } from "../../modules/urls";
import { groupId } from "../../modules/consts";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    photo_200?: string;
    sex?: number;
    [key: string]: any;
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

    private async getData(): Promise<void> {
        try {
            console.log(urls.getGroupMembers(groupId));
            const response = await fetch(urls.getGroupMembers(groupId), {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            this.renderData(data.response.items as User[]);

        } catch (e: any) {
            console.error("Ошибка загрузки данных", e);
            this.pageRoot.innerHTML = `<p style="color:red;">Не удалось загрузить данные: ${e.message}</p>`;
        }
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
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const filterInput = document.getElementById("filter-input") as HTMLInputElement;

        filterInput?.addEventListener("input", async () => {
            const value = filterInput.value.toLowerCase().trim();

            try {
                const response = await fetch(urls.getGroupMembers(groupId), {
                    method: "POST"
                });

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                let items = (await response.json()).response.items as User[];

                if (value === "man") items = items.filter(u => u.sex === 2);
                if (value === "woman") items = items.filter(u => u.sex === 1);


                this.renderData(items);

            } catch (e: any) {
                console.error("Ошибка фильтрации данных", e);
                this.pageRoot.innerHTML = `<p style="color:red;">Ошибка фильтрации: ${e.message}</p>`;
            }
        });

        this.getData();
    }
}
