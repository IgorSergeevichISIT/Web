import {AccordionComponent} from "../../components/accordion/index.js"
import { IngoDogPage } from "../Infodog/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <div class="accordion" id="accordionExample" style="width: 450px;"></div>
            `
        )
    }

    get pageRoot() {
        return document.getElementById('accordionExample')
    }

    getData() {
        return [
            {
                id: 1,
                name: "Далматинец",
                src: "././src/img/images.jpg",
                info: "Далматинец это – энергичный и жизнерадостный питомец. Благодаря его яркой внешности, вы точно не останетесь незамеченными во время прогулок в парке и на собачьих площадках.",
                pos: "One",
                show: "",
                collapse: ""
            },
            {
                id: 2,
                name: "Той терьер",
                src: "././src/img/Dogs_Bokeh_Labrador_Retriever_Sitting_586668_640x960.jpg",
                info: " Той терьер — это миниатюрная гармонично сложенная собака элегантной внешности. У нее высокие тонкие конечности, большие выразительные глаза и костистая морда с плотно прилегающими губами. Уши большие, стоячие, живот подтянут, мускулатура крепкая. Собака никогда не должна производить впечатление рыхлости, напротив, той-терьер всегда выглядит спортивным и готовым к энергичным действиям.",
                pos: "Two",
                show: "",
                collapse: ""
            },
            {
                id: 3,
                name: "Чау-чау",
                src: "././src/img/0c07cce61e4c5b82d6af47c6ec4c5437.jpg",
                info: "Чау-чау это одна из самых древних пород собак родом из Китая, притягивающая восторженные взгляды своим удивительным внешним видом: пышной львиной гривой, нахмуренной мордой и фиолетовым языком. Чау-чау хоть и похож на милого плюшевого медвежонка, характер у него весьма своенравный, поэтому к нему нужен грамотный подход.",
                pos: "Three",
                show: "",
                collapse: ""
            },
        ]
    }

    clickCard(e) {
        const button = e.target;
        const cardId = button.dataset.id;
        const cardName = button.dataset.name;
        const cardSrc = button.dataset.src;
        const cardInfo = button.dataset.info
        const infodogpage = new IngoDogPage(this.parent, cardId, cardSrc, cardName, cardInfo)
        infodogpage.render()
    }

    render(id) {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            if (id == item.id) {
                item.show = " show";
                item.collapse = "";
            }

            else {
                item.show = "";
                item.collapse = " collapsed";
            }
            const accordion = new AccordionComponent(this.pageRoot)
            accordion.render(item, this.clickCard.bind(this));
        })
    }
}