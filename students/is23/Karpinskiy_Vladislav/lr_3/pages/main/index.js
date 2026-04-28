import { DogCardComponent } from "../../components/dog-card/index.js";
import { DogPage } from "../dog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;

        this.data = [
            {
                id: 1,
                name: "Ретвивер",
                img: "img/retr1.jpg",
                short: "Добрая, умная собака. Хорошо подходит для семьи.",
                full: "Голден ретривер — дружелюбная, умная, обучаемая порода..."
            },
            {
                id: 2,
                name: "Овчарка",
                img: "img/ovch.jpg",
                short: "Не лает не кусает.",
                full: "На страже вашей семьи."
            },
            {
                id: 3,
                name: "Сенбернар",
                img: "img/сенбернар.jpeg",
                short: "Отлично ладит с детьми и подходит для жизни в доме.",
                full: "Крупная и добродушная собака, известная своим спокойным характером и преданностью семье"
            }
        ];
    }

    render() {

        this.parent.innerHTML = `
            <header class="d-flex justify-content-between align-items-center mb-4">
                <h1>Собаки</h1>
                <div>
                    <button id="home-btn" class="btn btn-secondary me-2">Домой</button>
                    <button id="add-btn" class="btn btn-success">Добавить</button>
                </div>
            </header>
            <div class="row row-cols-1 row-cols-md-4 g-4 justify-content-center" id="cards-row"></div>
        `;
        document.getElementById("add-btn").addEventListener("click", () => {
            const firstDog = this.data[0];
            const newDog = { ...firstDog, id: Date.now() }; // уникальный id
            this.data.push(newDog);
            this.render(); // перерендер страницы
        });


        const cardsRow = document.getElementById("cards-row");

        this.data.forEach(item => {
            const card = new DogCardComponent(cardsRow);

            card.render(item, 
                (data) => { // "Подробнее"
                    new DogPage(this.parent, data).render();
                }, 
                (data) => { // "Удалить"
                    const index = this.data.findIndex(d => d.id === data.id);
                    if(index !== -1) {
                        this.data.splice(index, 1);
                        this.render(); // перерендер страницы
                    }
                }
            );
        });
    }
}
