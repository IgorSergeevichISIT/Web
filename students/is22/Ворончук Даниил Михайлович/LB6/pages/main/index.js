import {AccordionComponent} from "../../components/accordion/index.js"
import { IngoDogPage } from "../Infodog/index.js";
import { Buttons } from "../../components/buttons/index.js";
import {axioss} from '../../modules/axios.js';
import {AddDog} from '../AddDog/index.js'
import { DeleteDog } from "../DeleteDog/index.js";

export class MainPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }
    
    getHTML() {
        return (
            `
                <div class="accordion" id="accordionExample" style="width: 450px;"></div>
            `
        )
    }

    getHTMLB(){
        return (
            `
                <div class="mybut"></div>
            `
        )
    }

    get pageRoot() {
        return document.getElementById('accordionExample')
    }

    getData() {
        axioss.findstocks((data) =>{
            this.renderData(data, this.id);
        })
    }

    renderData(data, id) {
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
    
    clickCard(e) {
        const button = e.target;
        const cardId = button.dataset.id;
        const infodogpage = new IngoDogPage(this.parent, cardId)
        infodogpage.render()
    }

    addListeners() {
        const button = document.getElementById("adddogbutton");
        const button_2 = document.getElementById("deletedogbutton");

        button.addEventListener("click", () => {
            const adddog  = new AddDog(document.getElementById('root'), this.id)
            adddog.render();
        })

        button_2.addEventListener("click", () => {
            const deletedog = new DeleteDog(document.getElementById('root'), this.id)
            deletedog.render()
        })
    
    }

    render() {
        this.parent.innerHTML = ''

        const dibv = this.getHTMLB()
        this.parent.insertAdjacentHTML('beforeend', dibv)
        
        const button1 = new Buttons(document.querySelector('.mybut'), 'adddogbutton', 'Добавить карточку')
        button1.render()

        const button2 = new Buttons(document.querySelector('.mybut'), 'deletedogbutton', 'Удалить Карточку')
        button2.render()

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData();
        this.addListeners();
    }
}