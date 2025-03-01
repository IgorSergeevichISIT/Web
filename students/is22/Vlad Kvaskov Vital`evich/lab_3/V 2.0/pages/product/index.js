import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;  
        this.id = id;  
    }

    getData() {
        const data = [
            {
                id: 1,
                src: "photo/4.jpg",
                text: `
                    <p class="mb-4"><b>Высота:</b> От 63 до 72 см в плечах (в зависимости от пола собаки).
                    <p class="mb-4"><b>Вес:</b> от 30 до 40 кг.
                    <p class="mb-4"><b>Окрас:</b> Черный, коричневый, синевато-черный с рыжими пятнами. 
                    <p class="mb-4"><b>Продолжительность жизни:</b> 10-13 лет. 
                    <p class="mb-4"><b>Характер:</b> Доберманы умные, решительные и преданные. Они прекрасно справляются с ролью защитников, но при правильном воспитании могут быть отличными домашними питомцами.
                    `
            },
            {
                id: 2,
                src: "photo/5.jpg",
                text: `
                    <p class="mb-4"><b>Размер:</b> Средний, обычно весит от 22 до 40 кг, высота в холке от 55 до 65 см. 
                    <p class="mb-4"><b>Шерсть:</b> Гладкая или длинная, с густым подшерстком. Шерсть может быть различных цветов, включая черный, черно-подпалый, серо-рыжий и другие. 
                    <p class="mb-4"><b>Темперамент:</b> Немецкие овчарки — это собаки с высоким интеллектом и высокой обучаемостью. Они стремятся угодить своему владельцу и хорошо обучаются. Эти собаки также известны своей решимостью и смелостью. 
                    <p class="mb-4"><b>Активность:</b> Немецкая овчарка требует активных физических и умственных нагрузок. Она будет счастлива, если ее владельцы будут активно заниматься с ней, проводя время на тренировках и прогулках. 
                    <p class="mb-4"><b>Продолжительность жизни:</b> 9-13 лет.`
            },
            {
                id: 3,
                src: "photo/6.jpg",
                text: `
                    <p class="mb-4"><b>Размер:</b> Вес питбуля варьируется от 12 до 27 кг, в зависимости от типа и пола. Обычно высота в холке составляет 46–56 см.  
                    <p class="mb-4"><b>Шерсть:</b> Короткая, плотная и блестящая, требующая минимального ухода. Питбули могут иметь разные окрасы, включая однотонный, пятнистый, мраморный и другие варианты. 
                    <p class="mb-4"><b>Темперамент:</b> Питбули известны своей энергичностью и дружелюбием по отношению к своим владельцам. Они привязаны к людям, любят внимание и взаимодействие. Однако они могут проявлять агрессию по отношению к другим животным, особенно если не были должным образом социализированы. 
                    <p class="mb-4"><b>Активность:</b> Очень активные собаки, которые требуют ежедневных физических и умственных нагрузок. Питбули любят игры и тренировки, поэтому важно обеспечивать им достаточно упражнений.  
                    <p class="mb-4"><b>Продолжительность жизни:</b> 12-16 лет.`
            }
        ];
        return data.find(item => item.id === (this.id)); 
    }
    
    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page"></div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        const product = this.getData(); 

        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const productComponent = new ProductComponent(this.pageRoot);
        productComponent.render(product);  

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }
}
