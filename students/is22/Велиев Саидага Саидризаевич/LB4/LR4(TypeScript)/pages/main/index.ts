import { ButtonComponent } from "../../components/button";
import { ProductCardComponent } from "../../components/product-card";
import { ProductPage } from "../product";
import { ajax } from "../../modules/ajax";
import { urls } from "../../modules/urls";
import { groupId } from "../../modules/consts";
import { SortPanelComponent } from "../../components/sort-panel";

export class MainPage {
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  private getHTML(): string {
    return `<div id="main-page" class="d-flex flex-wrap"></div>`;
  }

  private getData(mode: string): void {
    ajax.post(urls.getGroupMembers(groupId, mode), (data: any) => {
      this.renderData(data.response.items);
    });
  }

  private renderData(items: any[]): void {
    items.forEach((item) => {
      const productCard = new ProductCardComponent(document.getElementById('main-page') as HTMLElement);
      productCard.render(item, this.clickCard.bind(this));
    });
  }

  private clickCard(e: Event): void {
    const target = e.target as HTMLButtonElement;
    const cardId = target.dataset.id || '';

    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
  }

  render(): void {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const sort = new SortPanelComponent(this.parent);
    sort.render(this.getData.bind(this));

    this.getData("");
  }
}