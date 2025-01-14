import { CarouselComponent } from "../../components/carousel/index.js";

export class MainPage {
    constructor(parent, navigateTo) {
        this.parent = parent;
        this.navigateTo = navigateTo;
    }
    render() {
        const data = [
        {
            src: "https://via.placeholder.com/800x400?text=Математика",
            title: "Математика",
            description: "Изучение чисел, алгебры, геометрии и аналитики.",
            details: "Математика включает темы такие как арифметика, теория вероятностей, линейная алгебра и другие."
            
        },
        {
            src: "https://via.placeholder.com/800x400?text=Физика",
            title: "Физика",
            description: "Наука о природе, механике, оптике и квантовой теории.",
            details: "Физика охватывает механические явления, электромагнетизм, термодинамику и квантовые эффекты."
        },
        {
            src: "https://via.placeholder.com/800x400?text=Химия",
            title: "Химия",
            description: "Изучение веществ, реакций и их свойств.",
            details: "Химия изучает состав, свойства и взаимодействия веществ, включая органическую и неорганическую химию."

        }
        ];
    
        const carousel = new CarouselComponent(this.parent, this.navigateTo);
        this.parent.innerHTML = `
            <section class="container mx-auto p-4">
            <h2 class="text-3xl font-bold mb-6">Добро пожаловать!</h2>
            ${carousel.getHTML(data)}
            </section>
        `;
        carousel.render(data);
        }
    }