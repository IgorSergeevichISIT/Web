import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class ProductPage {
    constructor(parent, id, onBack) {
        this.parent = parent;
        this.id = id;
        this.onBack = onBack; // callback
    }

    getData() {
        const offers = [
            {
                id: 1,
                src: "images/image1.jpg",
                title: "Скидка 20% на первый депозит!",
                text: "Откройте счёт сегодня и получите 20% в подарок. Успейте до конца месяца!",
                details: "Действует для новых клиентов. Минимальный депозит — 1000 руб."
            },
            {
                id: 2,
                src: "images/image2.jpg",
                title: "Бесплатный анализ портфеля",
                text: "Получите профессиональную оценку ваших инвестиций от наших экспертов. Без обязательств!",
                details: "Отправьте данные на email support@finance.com. Ответ — в течение 24 часов."
            },
            {
                id: 3,
                src: "images/image3.jpg",
                title: "Кэшбэк 10% на все операции",
                text: "Каждая сделка приносит вам деньги обратно. Начните экономить уже сегодня!",
                details: "Программа действует для всех активных клиентов. Кэшбэк доступен каждую пятницу."
            },
        ];
        return offers.find(item => item.id == this.id) || offers[0];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="text-center">
                <h3 class="mb-4">Подробности акции</h3>
            </div>
        `;
    }

    clickBack() {
        if (this.onBack) {
            this.onBack(); 
        }
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}