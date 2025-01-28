import { AccordionComponent } from "../../components/accordion/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [
            {
                id: 1,
                src: "photo/2.jpg",
                title: " Доберман",
                name:`Параметры добермана`,
                text:  `
                        <p class="mb-4"><b>Доберман</b> - это крупная и мускулистая собака с элегантным и стройным телосложением.</p>
                        <p class="mb-4">Это порода, известная своей верностью и защитными инстинктами.</p>
                        <p class="mb-4">Доберманы являются отличными охранниками, с высоким уровнем интеллекта и энергией. Несмотря на свою силу и мускулистость, они обладают ласковым и дружелюбным характером, особенно если с ними правильно работать с раннего возраста.</p>
                        <p class="mb-4">Доберманы идеально подходят для активных людей, которые могут уделить достаточно времени для тренировки и физических нагрузок этой породе.</p>
                       `   
                
            },
            {
                id: 2,
                src: "photo/3.jpg",
                title: "Немецкая овчарка",
                name:`Параметры немецкой овчарки`,
                text: `
                      <p class="mb-4"><b>Немецкая овчарка</b> - это одна из самых популярных и универсальных пород собак, известная своей верностью, интеллектом и послушанием. 
                      <p class="mb-4">Эта порода была выведена в Германии в конце 19 века с целью создания универсальной рабочей собаки для пастушества и охраны.</p>
                      <p class="mb-4">Сегодня немецкая овчарка используется в различных областях, включая службу в полиции, армию, спасательные операции, а также как домашний питомец.</p> 
                      `
            },
            {
                id: 3,
                src: "photo/1.jpg",
                title: "Питбуль",
                name:`Параметры питбуля`,
                text: `
                       <p class="mb-4"><b>Питбуль</b> - это порода собак, известная своей силой, выносливостью и лояльностью.
                       <p class="mb-4">Питбули, как правило, имеют компактное, мускулистое телосложение, что делает их отличными защитниками и отличными спортивными партнерами. 
                       <p class="mb-4">Несмотря на свою репутацию, питбули часто считаются нежными и преданными питомцами, если их правильно социализировать и обучать с раннего возраста.</p>
                      `
            },
        ];
    }


    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap"></div>`;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id, 10);
        const productPage = new ProductPage(this.parent, cardId); 
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(this.data, this.clickCard.bind(this));
    }
}
