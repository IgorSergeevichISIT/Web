import { ProductCardComponent } from "../../components/product-card/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent, appState, allData) {
        this.parent = parent;
        this.appState = appState;
        this.allData = allData;
    }

    getAllData() {
        return this.allData;
    }

    addCard() {
        const newItem = {
            ...this.allData[this.appState.nextIndex],
            uid: 'card_' + Date.now()
        };
        this.appState.items.push(newItem);
        this.appState.nextIndex = (this.appState.nextIndex + 1) % this.allData.length;
        this.render();
    }

    removeCard(uid) {
        this.appState.items = this.appState.items.filter(item => item.uid !== uid);
        this.render();
    }

    clickCard(e) {
        const uid = e.target.dataset.uid;
        const item = this.appState.items.find(i => i.uid === uid);
        if (!item) return;
        const productPage = new ProductPage(this.parent, item.id, window.showMainPage);
        productPage.render();
    }

    clickAction(e) {
        const uid = e.target.dataset.uid;
        const item = this.appState.items.find(i => i.uid === uid);
        if (!item) return;
        const toast = new ToastComponent(document.querySelector('.toast-container'));
        toast.render({
            title: "Успешно",
            message: item.toastMessage,
            type: "info"
        });
    }

    clickRemove(e) {
        const uid = e.target.dataset.uid;
        if (uid) {
            this.removeCard(uid);
        }
    }

    render() {
        this.parent.innerHTML = '';

        const html = `
            <div id="main-page" class="d-flex flex-wrap justify-content-start">
                <h2 class="w-100 mb-4 text-center">Финансовые Акции</h2>
                <p class="w-100 text-center text-muted mb-3">Выберите предложение и узнайте подробности!</p>
                <button id="add-card-btn" class="btn btn-success mb-4">+ Добавить акцию</button>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        document.getElementById('add-card-btn').onclick = () => this.addCard();

        const pageRoot = document.getElementById('main-page');
        this.appState.items.forEach((item) => {
            const productCard = new ProductCardComponent(pageRoot);
            productCard.render(
                item,
                this.clickCard.bind(this),
                this.clickAction.bind(this),
                this.clickRemove.bind(this)
            );
        });
    }
}