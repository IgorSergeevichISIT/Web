import { DogCardComponent } from "../../components/dog-card/index.js";
import { DogPage } from "../dog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    async render() {

        // 1. получаем данные с backend
        const response = await fetch("http://localhost:8000/dogs");
        this.data = await response.json();

        // 2. рендер HTML
        this.parent.innerHTML = `
            <header class="d-flex align-items-center justify-content-between mb-4 px-3">

                <button id="home-btn" class="btn btn-secondary">
                    Домой
                </button>

                <h1 class="m-0 flex-grow-1 text-center">
                    Собаки
                </h1>

                <!-- пустышка -->
                <div style="width: 100px;"></div>

            </header>

            <div class="d-flex flex-column gap-2 mt-3 mb-4">
                <input id="dog-name" class="form-control" placeholder="Название">
                
                <input id="dog-img" type="file" class="form-control">
                
                <input id="dog-short" class="form-control" placeholder="Краткое описание">
                
                <input id="dog-full" class="form-control" placeholder="Полное описание">
                
                <button id="add-btn" class="btn btn-success">Добавить</button>
            </div>

            <div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center" id="cards-row"></div>
        `;

        // 3. кнопка "Домой"
        document.getElementById("home-btn").addEventListener("click", () => {
            new MainPage(this.parent).render();
        });

        // 4. кнопка "Добавить" (POST API)
        document.getElementById("add-btn").addEventListener("click", async () => {

            const name = document.getElementById("dog-name").value;
            const fileInput = document.getElementById("dog-img");
            const short = document.getElementById("dog-short").value;
            const full = document.getElementById("dog-full").value;

            if (!name || fileInput.files.length === 0) {
                alert("Заполни все поля");
                return;
            }

            // 👇 берём имя файла
            const fileName = fileInput.files[0].name;

            const newDog = {
                name,
                img: `img/${fileName}`, // ВАЖНО
                short,
                full
            };

            try {
                const res = await fetch("http://localhost:8000/dogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newDog)
                });

                const data = await res.json();
                console.log("Добавлено:", data);

                this.render();

            } catch (e) {
                console.error(e);
            }
        });

        // 5. рендер карточек
        const cardsRow = document.getElementById("cards-row");

        this.data.forEach(item => {
            const card = new DogCardComponent(cardsRow);

            card.render(
                item,

                // Подробнее
                (data) => {
                    new DogPage(this.parent, data).render();
                },

                // Удалить
                async (data) => {
                    await fetch(`http://localhost:8000/dogs/${data.id}`, {
                        method: "DELETE"
                    });

                    this.render();
                },

                // Редактировать
                async (data) => {

                    const newName = prompt("Название", data.name);
                    const newShort = prompt("Краткое описание", data.short);
                    const newFull = prompt("Полное описание", data.full);

                    if (!newName || !newShort || !newFull) return;

                    await fetch(`http://localhost:8000/dogs/${data.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...data,
                            name: newName,
                            short: newShort,
                            full: newFull
                        })
                    });

                    this.render();
                }
            );
        });
    }
}