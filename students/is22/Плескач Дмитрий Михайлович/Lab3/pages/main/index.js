import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        return [
            {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkSfBYYjGRmPnqV3041GhxcxwesKlME9sGw&s",
                title: "Устали от того",
                text: "что кошки точат когти о мебель?"
            },
            {
                id: 2,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3YPJmHygm5Wcwd8ncnEG0H5pSjYjYvh817A&s",
                title: "Не знаете что делать",
                text: "с тем что все провода перегрызанны?"
            },
            {
                id: 3,
                src: "https://avatars.dzeninfra.ru/get-zen_doc/114944/pub_61211ed355870f1be0be256a_6123ac9537a42a0d0c051dea/scale_1200",
                title: "Не осталось посуды",
                text: "из за того что коты всё сбрасывают на пол?"
            },
        ]
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
    
}