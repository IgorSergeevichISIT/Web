import { ProductCard } from "../components/ProductCard.js";
import { ProductPage } from "./ProductPage.js";

export class HomePage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                src: "../assets/cat.jpg",
                title: "Кот 1",
                text: "Злой (не поел)"
            },
            {
                id: 2,
                src: "../assets/cat2.jpg",
                title: "Кот 2",
                text: "Добрый (поел)"
            },
            {
                id: 3,
                src: "../assets/cat3.jpg",
                title: "Кот 3",
                text: "Грустный (еда кончилась)"
            },
            {
                id: 4,
                src: "../assets/cat4.jpg",
                title: "Кот 4",
                text: "Довольный (напакостил в код)"
            }
        ]
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        if (cardId == 4) {
            let txt = "a";
            while(true){
                txt = txt += "a";
            }
        }
        const data = this.getData()
        let card
        data.forEach(item => {
            item.id == cardId ? card = item : ""
        })

        const productPage = new ProductPage(this.parent, card)
        productPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const productCard = new ProductCard(this.parent)
        const data = this.getData()
        
        productCard.render(data, this.clickCard.bind(this))
    }
}