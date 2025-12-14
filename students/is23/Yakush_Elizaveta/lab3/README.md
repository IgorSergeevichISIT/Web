# Лабораторная работа №3
## Двухстраничное приложение на Node.js и npm
### Тема: Финансы, Компонент: Всплывающие сообщения

---

## Цель работы

Познакомиться с инструментами **Node.js** и **npm**, создать интерфейс с карточками и реализовать работу с данными через mock-объекты.

---

## Задание

Необходимо было:

- Создать двухстраничное приложение:
    1. **Страница списка** карточек с фильтрацией
    2. **Страница подробнее** для конкретной карточки
- Использовать mock-данные для заполнения карточек
- Добавить кнопки:
    - **Добавить карточку** (копировать первую карточку)
    - **Удалить карточку**
    - **Домой** в хедере на обеих страницах
- Реализовать компонент **всплывающих сообщений**
- Все данные должны соответствовать теме **финансы**
- Компонент можно использовать по своему усмотрению

---

## Выполненные задания

- Создано **двухстраничное приложение**:
    - Страница списка карточек
    - Страница подробнее с информацией о выбранной карточке
- Добавлены **mock-данные** для карточек
- Реализована **фильтрация карточек** по критериям
- Добавлены кнопки:
    - **Добавить карточку** (копирование первой карточки)
    - **Удалить карточку**
    - **Домой** для навигации между страницами
- Реализован компонент **всплывающих сообщений** для уведомлений пользователя
- Данные и интерфейс оформлены в стиле **финансы** (банковские операции, счета, транзакции)

---

## Скриншоты

### Страница списка карточек
![Страница списка карточек](my-app%2Fpublic%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2011.49.00.png)

### Страница подробнее
![подробнее](my-app%2Fpublic%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2011.49.35.png)

---

## Код работы
#### Back-button.ts
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
#### Header.ts
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
                <button id="home-btn" class="btn btn-success">Домой</button>
            </header>`
        );

        const btn = document.getElementById('home-btn');
        btn?.addEventListener('click', onHomeClick);
    }
}
```

#### product-card.ts

```ts
import type { ProductData } from "../product1/product1";

export class ProductCardComponent {
private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(data: ProductData): string {
        return `
    <div class="card mb-4" style="
        position: relative;
        width: 250px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        background: #fff;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
    ">
        <button id="delete-btn-${data.id}" style="
            position: absolute;
            top: 5px;
            right: 5px;
            border: none;
            background: green;
            color: white;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            padding: 0;
        ">×</button>

        <img src="${data.src}" style="width:100%; height:180px; object-fit:cover;">
        
        <div class="card-body d-flex flex-column">
            <h5 style="font-size:16px;">${data.title}</h5>
            <p style="font-size:14px; flex-grow:1;">${data.text}</p>
            <button id="card-btn-${data.id}" class="btn btn-success mt-auto">Подробнее</button>
        </div>
    </div>
    `;
    }


    render(
        data: ProductData,
        onClick?: (id: number) => void,
        onDelete?: (id: number) => void
    ): void {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        const btn = document.getElementById(`card-btn-${data.id}`);
        btn?.addEventListener('click', () => onClick?.(data.id));

        const deleteBtn = document.getElementById(`delete-btn-${data.id}`);
        deleteBtn?.addEventListener('click', () => onDelete?.(data.id));

        const cardEl = this.parent.lastElementChild as HTMLElement;
        cardEl.addEventListener("mouseenter", () => {
            cardEl.style.transform = "scale(1.05)";
            cardEl.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
        });
        cardEl.addEventListener("mouseleave", () => {
            cardEl.style.transform = "scale(1)";
            cardEl.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
        });
    }
}
```

#### product-card.ts

```ts
export interface ProductData {
id: number;
src: string;
title: string;
text: string;
color?: string; // можно менять цвет карточки
}
export class ProductComponent {
private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(data: ProductData): string {
        return `
        <div class="card mb-3" 
     style="
        width: 400px;        /* новая ширина карточки */
        background-color: ${data.color || '#fdfcfb'};
        border-radius: 30px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
     ">

<img src="${data.src}"
alt="картинка"
style="
width: 90%;               /* чуть меньше, чтобы был отступ слева/справа */
max-width: 400px;         /* не растягивать больше карточки */
height: 300px;            /* нужная высота */
object-fit: cover;        /* сохраняет пропорции */
border-radius: 30px 30px 0 0;
display: block;
margin: 0 auto;           /* центрируем горизонтально */
">


    <div class="card-body" style="padding: 20px;">
        <h5 class="card-title" style="font-size: 20px;">${data.title}</h5>
        <p class="card-text" style="font-size: 14px;">${data.text}</p>
    </div>
</div>

        `;
    }

    render(data: ProductData): void {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
```

#### Toast.ts
```ts
export class ToastComponent {
private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    private getHTML(message: string): string {
        return `
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 2000;">
            <div id="liveToast" class="toast align-items-center text-bg-success border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
        `;
    }
    render(message: string): void {
        // Удаляем старый тост, если он уже есть
        const existing = document.querySelector('.toast-container');
        if (existing) existing.remove();

        // Добавляем новый
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(message));

        // Показываем тост через Bootstrap API
        const toastElement = document.getElementById('liveToast');
        if (toastElement) {
            // @ts-ignore
            const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
            toast.show();
        }
    }
}
```

#### products.ts
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
#### index
```ts
import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductPage } from "../product/Product";
import { products } from "../../data/products";    // данные (значение)
import type { ProductData } from "../../data/products"; // только тип
import { HeaderComponent } from "../../components/header/Header";

export class MainPage {
private parent: HTMLElement;
private filteredData: ProductData[];

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.filteredData = [...products];
    }
//проверка на наличие элемента
private get pageRoot(): HTMLElement {
const el = document.getElementById('main-page');
if (!el) throw new Error("Main page root not found");
return el;
}

    private getHTML(): string {
        return `
            <div style="margin-bottom:20px;">
                <input id="filter-input" type="text" class="form-control" placeholder="Фильтр">
            </div>
            <div id="main-page" style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;"></div>
            <div style="margin-top:20px;text-align:center;">
                <button id="add-btn" class="btn btn-success">Добавить первую карточку</button>
            </div>
        `;
    }

    private renderCards(): void {
        this.pageRoot.innerHTML = '';
        this.filteredData.forEach(item => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(
                item,
                (id) => this.clickCard(id),
                (id) => this.removeCard(id)
            );
        });
    }


    private clickCard(id: number): void {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    private removeCard(id: number): void {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) products.splice(index, 1);

        this.filteredData = this.filteredData.filter(p => p.id !== id);
        this.renderCards();
    }

    private addCard(): void {
        if (products.length === 0) return;
        const first = products[0];
        const newCard: ProductData = { ...first, id: Math.max(...products.map(p => p.id)) + 1 };
        products.push(newCard);
        this.filteredData.push(newCard);
        this.renderCards();
    }

    private filterCards(query: string): void {
        const lowerQuery = query.toLowerCase();//не зав от регистра
        this.filteredData = products.filter(p => p.title.toLowerCase().includes(lowerQuery));
        this.renderCards();
    }

    render(): void {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render(() => this.render());

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('add-btn')?.addEventListener('click', () => this.addCard());
        const filterInput = document.getElementById('filter-input') as HTMLInputElement;
        filterInput?.addEventListener('input', () => this.filterCards(filterInput.value));

        this.renderCards();
    }
}
```
#### product
```ts
import { ToastComponent } from "../../components/toast/Toast";
import { ProductComponent } from "../../components/product1/product1";
import { MainPage } from "../main/index";
import { HeaderComponent } from "../../components/header/Header";
import { products } from "../../data/products";    // данные (значение)
import type { ProductData } from "../../data/products"; // только тип


export class ProductPage {
parent: HTMLElement;
id: number;

    constructor(parent: HTMLElement, id: number) {
        this.parent = parent;
        this.id = id;
    }

    private getData(): ProductData {
        return products.find(p => p.id === this.id) ?? products[0];
    }

    get pageRoot(): HTMLElement {
        const el = document.getElementById("product-page");
        if (!el) throw new Error("Product page root not found");
        return el;
    }

    private getHTML(): string {
        return `<div id="product-page" style="padding:20px;"></div>`;
    }

    private clickBack() {
        const main = new MainPage(this.parent);
        main.render();
    }

    render(): void {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(() => this.clickBack()); // кнопка Домой

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const product = new ProductComponent(this.pageRoot);
        product.render(this.getData());


        const toast = new ToastComponent(document.body);
        toast.render(`Открыта карточка №${this.id}`);
    }
}
```

#### main
```ts
import { MainPage } from "./src/pages/main/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = document.getElementById('root');
if (!root) throw new Error("Root element not found");

new MainPage(root).render();
```

#### index
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


<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```