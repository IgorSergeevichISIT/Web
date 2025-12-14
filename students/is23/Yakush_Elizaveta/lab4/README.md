# Лабораторная работа №4
## Двухстраничное приложение с использованием VK API
### Вариант 2: Работа с методами groups.getMembers и users.get

---

## Цель работы

Создать двухстраничное приложение, которое получает данные из **VK API**, реализует фильтрацию и отображение пользователей группы, закрепляя навыки работы с внешними API.

---

## Задание

1. **Главная страница** – `groups.getMembers`
    - Получаем список участников выбранной группы через VK API
    - Отображаем их в виде карточек
    - Реализуем компонент **filter**, который фильтрует пользователей по параметрам метода `groups.getMembers`

2. **Вторая страница** – `users.get`
    - Отображаем подробную информацию о выбранном пользователе с главной страницы

3. Двухстраничное приложение должно включать:
    - Навигацию между страницами
    - Использование VK API
    - Фильтр по заданным параметрам метода

---

## Выполненные задания

- Создано **двухстраничное приложение с использованием VK API**
- Главная страница:
    - Отображает участников группы в виде карточек
    - Реализован компонент **фильтрации** по полу
- Вторая страница:
    - Отображает подробную информацию о выбранном пользователе (`users.get`)
- Навигация между страницами через кнопки **Домой**
- Использован реальный API для получения данных пользователей
- Реализованы всплывающие уведомления при загрузке данных или ошибках

---

## Скриншоты

### Главная страница (список участников группы)
![Главная страница](my-app%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.14.01.png)

### Страница пользователя
![Страница пользователя](my-app%2Fsrc%2Fcomponents%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.14.59.png)

---

## Пример кода

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple App</title>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>

<div id="root"></div>
<script src="main.ts" type="module"></script>
<link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
/>
<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
></script>
<link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
/>


<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
### Back-button.ts
```ts
export class BackButtonComponent {
private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private addListeners(listener: () => void): void {
        const btn = document.getElementById("back-button");
        if (!btn) throw new Error("Back button not found");
        btn.addEventListener("click", listener);
    }

    private getHTML(): string {
        return `
      <button id="back-button" class="btn btn-success" type="button">Назад</button>
    `;
    }

    render(listener: () => void): void {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(listener);
    }
}

```
### Header
```ts
export class HeaderComponent {
private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    render(onHomeClick: () => void) {
        this.parent.insertAdjacentHTML(
            'beforeend',
            `<header style="display:flex;justify-content:flex-end;padding:10px;background:#f5f5f5;">
                <button id="home-btn" class="btn btn-primary">Домой</button>
            </header>`
        );

        const btn = document.getElementById('home-btn');
        btn?.addEventListener('click', onHomeClick);
    }
}

```
### product-card
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
                <button class="btn btn-primary w-100 mt-2" data-id="${user.id}">
                    Подробнее
                </button>
            </div>
        </div>`;
    }

    render(user: any, onClick: () => void): void {
        const html = this.getHTML(user);
        this.parent.insertAdjacentHTML("beforeend", html);

        const btn = this.parent.querySelector(`button[data-id="${user.id}"]`) as HTMLElement;
        btn.addEventListener("click", () => onClick());
    }
}
```
### product1
```ts
export class ProductComponent {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    getHTML(user: any): string {
        return `
        <div class="card" style="width: 300px; margin:0 auto; text-align:center;">
            <img src="${user.photo_200 || 'https://via.placeholder.com/200'}" 
                 alt="${user.first_name}" 
                 class="card-img-top" 
                 style="border-radius:50%; max-width:200px; margin: 10px auto;">
            <div class="card-body">
                <h3>${user.first_name} ${user.last_name}</h3>
                <p>ID: ${user.id}</p>
            </div>
        </div>`;
    }

    render(user: any): void {
        this.parent.innerHTML = this.getHTML(user);
    }
}
```
### products
```ts
export interface ProductData {
id: number;
src: string;
title: string;
text: string;
color?: string;
}

export const products: ProductData[] = [
{ id: 1, src: "/photo1.jpeg", title: "Финансовая акция 1", text: "Инвестируйте с выгодой!" },
{ id: 2, src: "/photo2.png", title: "Финансовая акция 2", text: "Успейте воспользоваться предложением!" },
{ id: 3, src: "/photo3.png", title: "Финансовая акция 3", text: "Сделайте свой капитал больше!" }
];
```
### ajax
```ts
export interface AjaxResponse<T = any> {
response?: T;
}

type SuccessCallback<T> = (data: AjaxResponse<T>) => void;
type ErrorCallback = (error: any) => void;

class Ajax {
post<T = any>(url: string, success: SuccessCallback<T>, error?: ErrorCallback): void {
const xhr = new XMLHttpRequest();
xhr.open("POST", url);
xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;

            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    success(data);
                } catch (e) {
                    error?.(e);
                }
            } else {
                error?.(xhr.statusText);
            }
        };
    }
}

export const ajax = new Ajax();
```
### consts
```ts
export const groupId: number = 234182420; // настоящий ID вашей группы
export const accessToken: string = "vk1.a.VieYnxu9KScuKdfYiRzKvrUKYUT9zJMiG-kXigWirRQM4vnrpwyDc3jMzawmkO7HrTveFwqjeBXbTvqbxTKYCEn_vnLrnrtD2DQ0cC3k58vwXBltmGmbdevX6l92n8zQV9B7EO-cQ27_8Xk7VtJmLk3G8Eq9zePI8oh08NiDViByx73nCdG797TQcdt-odsnXceniakoYlr9nO6pDTBJrw";
export const version: string = "5.131";
```
### urls
```ts
import { accessToken, version } from "./consts";

class Urls {
private url: string;
private commonInfo: string;

    constructor() {
        this.url = "https://api.vk.com/method";
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    getUserInfo(userId: number): string {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`;
    }

    getGroupMembers(groupId: number): string {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_200,sex&${this.commonInfo}`;
    }

}

export const urls = new Urls();
```
### index
```ts
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
```
### Product
```ts
import { ProductComponent } from "../../components/product1/product1.ts";
import { MainPage } from "../main/index.ts";

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
