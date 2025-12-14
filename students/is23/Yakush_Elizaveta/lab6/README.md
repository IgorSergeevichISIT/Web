# Лабораторная работа №6
## Доработка проектов ЛР3–5 с Backend For Frontend (BFF)

---

## Цель работы

Доработать проекты с ЛР3–5, добавив полноценный бэкенд на Node.js:

- Убрать прямые обращения к VK API с фронтенда
- Реализовать добавление и удаление карточек
- Настроить фронтенд на работу с собственным API
- **Дополнительно**: создать BFF, который получает данные из VK API, сохраняет их в файл `users.json` и отдает фронтенду

---

## Задание

1. **Функциональные изменения**:
    - Добавить возможность добавления карточек (копировать существующую)
    - Добавить возможность удаления карточек
    - Убрать все вызовы `getData()` на фронтенде
    - Использовать данные, возвращаемые моим бэкендом

2. **Бэкенд (Node.js)**:
    - Возвращает данные участников группы, которые раньше загружались через VK API
    - Сохраняет данные в файл `users.json`
    - Реализует маршруты для получения списка пользователей, добавления и удаления карточек
    - Фронтенд делает запросы на ваш API вместо VK API

3. **Дополнительное задание (BFF)**:
    - Логика работы с VK API полностью перенесена на сервер
    - Сервер делает запросы к VK API, обновляет файл `users.json`, и отдает фронтенду данные
    - Фронтенд больше не общается напрямую с VK API

---

## Выполненные задания

- Реализован бэкенд на Node.js для приложения
- Добавление и удаление карточек на фронтенде с обновление данных в беке
- Убраны все прямые обращения к VK API с фронтенда
- Вся логика работы с VK API вынесена на сервер (BFF)
- Данные сохраняются в `users.json` и предоставляются фронтенду через REST API
- Фронтенд полностью работает через наш сервер, отображает карточки и обновляет их динамически
- Обработаны ошибки при обращении к VK API и при работе с файлом

---

## Скриншоты

### Главная страница (список участников)
![Главная страница](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.54.44.png)

### Страница пользователя
![Страница пользователя](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.55.19.png)

### Добавление карточки
![Добавление карточки](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.55.47.png)
![[Добавление карточки](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.56.29.png)
![Добавление карточки](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.57.25.png)

### Удаление карточки
![Удаление карточки](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.58.07.png)
![Удаление карточки](my-app%2Ffrontend%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.58.41.png)
---
##  Server

```ts

import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs/promises";
import { groupId, accessToken, version } from "./consts";

interface ReqAddUser {
id: number;
first_name: string;
last_name: string;
sex?: number;
}


interface User {
id: number;
"photo_200": "https://sun33-2.userapi.com/impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200",
first_name: string;
last_name: string;
sex?: number;
"can_access_closed": true,
"is_closed": false
}

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

app.get("/api/members", async (req: Request, res: Response) => {
try {
const refresh = String(req.query.refresh) === "true";
console.log(refresh);
let users: User[] = [];
if (!refresh) {
let usersData;
try {
usersData = await fs.readFile(USERS_FILE, "utf-8");
} catch {
usersData = "";
}
if (usersData.length > 0) {
users = JSON.parse(usersData);
}
if (users.length > 0) {
return res.json(users);
}
}

        // Если refresh=true или файл пустой — получаем данные из VK
        const url = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&fields=photo_200,sex&access_token=${accessToken}&v=${version}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(400).json(data.error);
        }

        await fs.writeFile(USERS_FILE, JSON.stringify(data.response.items, null, 2));
        res.json(data.response.items);
    } catch (err: any) {
        res.status(500);
    }
});



// ---------- Добавление пользователя ----------
app.post("/api/addUser", async (req: Request, res: Response) => {
try {
const reqUser: ReqAddUser = req.body;
console.log(reqUser)
const users: User[] = JSON.parse(await fs.readFile(USERS_FILE, "utf-8"));
const newUser: User = {
id: reqUser.id,
photo_200: "https://sun33-2.userapi.com/impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360&sign=10ad7d7953daabb7b0e707fdfb7ebefd&u=I6EtahnrCRLlyd0MhT2raQt6ydhuyxX4s72EHGuUSoM&cs=200x200",
first_name: reqUser.first_name,
last_name: reqUser.last_name,
sex: reqUser.sex,
can_access_closed: true,
is_closed: false
};
users.push(newUser);
await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
res.json(newUser);
} catch (err: any) {
res.status(500).json({ error: err.message });
}
});

// ---------- Удаление пользователя ----------
app.post("/api/removeUser", async (req: Request, res: Response) => {
try {
const { userId } = req.body;
let users =JSON.parse(await fs.readFile(USERS_FILE, "utf-8"))
.filter((u: User) => u.id !== userId);

        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.json({ success: true });
    } catch (err: any) {
        res.status(500);
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

```
##  Product

```ts
import { ProductComponent } from "../../components/product1/product1";
import { MainPage } from "../main";

export class ProductPage {
   private parent: HTMLElement;

   constructor(parent: HTMLElement) {
      this.parent = parent;
   }

   render(user: any): void {
      this.parent.innerHTML = "";

      // кнопка назад
      const backButton = document.createElement("button");
      backButton.textContent = "Назад";
      backButton.className = "btn btn-primary mb-3";
      backButton.onclick = () => {
         const mainPage = new MainPage(this.parent);
         mainPage.render();
      };
      this.parent.appendChild(backButton);

      // корень страницы пользователя
      const root = document.createElement("div");
      root.id = "product-page";
      this.parent.appendChild(root);

      // рендерим пользователя
      const product = new ProductComponent(root);
      product.render(user);
   }
}

```
##  index

```ts
import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductPage } from "../product/Product";

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
private users: User[] = [];      // пользователи
constructor(parent: HTMLElement) {
this.parent = parent;
this.users = [];
}

    private get pageRoot(): HTMLElement {
        const el = document.getElementById("main-page");
        if (!el) throw new Error("Main page root not found");
        return el;
    }

    private getHTML(): string {
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


    private async getData(refresh: boolean = false): Promise<void> {
        try {
            const response = await fetch(`http://localhost:3000/api/members?refresh=${refresh}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            this.users = (await response.json()) as User[];
            console.log(response)
            this.renderData(this.users);

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
            card.render(
                item,
                () => this.clickCard(item),          // детали
                () => this.removeUser(item.id)       // удаление
            );
        });
    }


    private clickCard(user: User): void {
        const productPage = new ProductPage(this.parent);
        productPage.render(user);
    }

    private async addUser() {
        // форма для добавления пользователя
        const first_name = prompt("Имя пользователя");
        if (!first_name) return;
        const last_name = prompt("Фамилия пользователя") || "";
        const sexStr = prompt("Пол (муж, жен)") || "муж";
        const sex =  sexStr.trim() === "жен" ? 1 : 2;
        const id = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1: 0;

        const newUser: User = { id, first_name, last_name, sex };

        const res = await fetch("http://localhost:3000/api/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        const data = await res.json();
        if (data.error) {
            alert("Ошибка: " + data.error);
        } else {
            this.getData();
        }
    }
    private async removeUser(id: number) {
        if (!confirm("Удалить пользователя из списка?")) return;

        const res = await fetch("http://localhost:3000/api/removeUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id })
        });

        const data = await res.json();
        if (data.success) {
            this.getData();
        } else {
            alert("Ошибка: " + data.error);
        }
    }

    render(): void {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const addBtn = document.getElementById("add-user-btn");
        addBtn?.addEventListener("click", () => this.addUser());

        const refreshBtn = document.getElementById("refresh-btn");
        refreshBtn?.addEventListener("click", () => this.getData(true));

        const filterSelect = document.getElementById("filter-select") as HTMLSelectElement;

        filterSelect?.addEventListener("change", async () => {
            const value = filterSelect.value.toLowerCase().trim();
            try {
                let items = [...this.users];

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
```
##  product-card

```ts
export class ProductCardComponent {
private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(user: any): string {
        return `
        <div class="card" style="width: 180px;">
            <img src="${user.photo_200 || ''}" class="card-img-top" alt="${user.first_name}">
            <div class="card-body">
                <h6 class="card-title text-center">
                    ${user.first_name} ${user.last_name}
                </h6>

                <button class="btn btn-primary w-100 mt-2" data-id="${user.id}" data-action="details">
                    Подробнее
                </button>

                <button class="btn btn-danger w-100 mt-2" data-id="${user.id}" data-action="remove">
                    Удалить
                </button>
            </div>
        </div>`;
    }


    render(user: any, onDetails: () => void, onRemove: () => void): void {
        const html = this.getHTML(user);
        this.parent.insertAdjacentHTML("beforeend", html);

        const detailsBtn = this.parent.querySelector(
            `button[data-id="${user.id}"][data-action="details"]`
        ) as HTMLElement;

        const removeBtn = this.parent.querySelector(
            `button[data-id="${user.id}"][data-action="remove"]`
        ) as HTMLElement;

        detailsBtn.addEventListener("click", () => onDetails());
        removeBtn.addEventListener("click", () => onRemove());
    }

}
```