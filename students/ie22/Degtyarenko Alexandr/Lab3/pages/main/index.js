import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap">
                <button id="add-stock" class="btn btn-success">Добавить карточку</button>
                <div id="product-cards" class="d-flex flex-wrap"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = this.getHTML();
        
        this.parent.insertAdjacentHTML('beforeend', html);
        
        document.getElementById('add-stock').addEventListener('click', this.addStock.bind(this));
        
        this.loadStocks();
    }

    async loadStocks() {
      try {
          const response = await fetch('http://localhost:8000/stocks'); // Измените на правильный URL
          if (!response.ok) throw new Error('Ошибка сети');
          
          const data = await response.json();
          data.forEach((item) => {
              const productCardContainer = document.getElementById('product-cards');
              const productCardComponent = new ProductCardComponent(productCardContainer);
              productCardComponent.render(item, this.clickCard.bind(this), this.deleteStock.bind(this));
          });
      } catch (error) {
          console.error('Ошибка загрузки карточек:', error);
      }
  }

  async addStock() {
      const src = prompt("Введите URL изображения:");
      const title = prompt("Введите название:");
      const text = prompt("Введите описание:");

      if (!src || !title || !text) return;

      const newStock = { id: Date.now(), src, title, text };

      try {
          const response = await fetch('http://localhost:8000/stocks', { // Измените на правильный URL
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newStock)
          });

          if (!response.ok) throw new Error('Ошибка при добавлении карточки');
          
          this.loadStocks(); // Перезагрузить данные
      } catch (error) {
          console.error('Ошибка добавления карточки:', error);
      }
  }

  async deleteStock(id) {
      try {
          const response = await fetch(`http://localhost:8000/stocks/${id}`, { method: 'DELETE' });
          
          if (!response.ok) throw new Error('Ошибка при удалении карточки');
          
          this.loadStocks(); // Перезагрузить данные
      } catch (error) {
          console.error('Ошибка удаления карточки:', error);
      }
  }

  clickCard(e) {
      const cardId = e.target.dataset.id;
      const productPage = new ProductPage(this.parent, cardId);
      productPage.render();
  }
}
