# Лабораторная работа №5
## Доработка ЛР4 с использованием `fetch`

---

## Цель работы

Доработать лабораторную работу №4, заменив все вызовы **XMLHttpRequest** на современный API **fetch** для работы с VK API.  
Улучшить обработку данных, сделать код более читаемым и современным.

---

## Задание

1. **Доработка ЛР4**:
    - Сохранить всю функциональность двухстраничного приложения:
        - Главная страница – список участников группы VK (`groups.getMembers`)
        - Страница пользователя – подробная информация (`users.get`)
    - Сохраняются фильтр по полу (`man` / `woman`), кнопка «Назад», кнопка «Домой»

2. **Заменить все вызовы XMLHttpRequest** на **fetch**:
    - Асинхронная загрузка данных через `fetch` с обработкой ошибок
    - Преобразование ответа с `response.json()`
    - Возможность использования `async/await` для упрощения кода

3. **Результат**:
    - Главная страница динамически получает список участников через `fetch`
    - Фильтр участников работает корректно
    - Страница пользователя загружает данные через `fetch`
    - Стиль и интерфейс остались такими же, как в ЛР4

---

## Выполненные задания

- Все вызовы API через **XMLHttpRequest** заменены на **fetch**
- Асинхронная обработка данных реализована через `async/await`
- Поддержаны все функции ЛР4:
    - Фильтрация участников
    - Кнопка «Назад»
    - Кнопка «Домой»
    - Отображение карточек и подробной информации
- Улучшена обработка ошибок при запросах к VK API
- Код стал более современным и читаемым

---

## Скриншоты

### Главная страница (список участников группы)
![список участников группы](my-app%2Fpublic%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.39.09.png)

### Страница пользователя
![Страница пользователя](my-app%2Fpublic%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2012.40.02.png)

---

##  код с `fetch`


```ts
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
```
#### так же удален файл ajax