import { ProductComponent } from "../../components/product";
import { BackButtonComponent } from "../../components/back-button";
import { MainPage } from "../main";
import { ajax } from "../../modules/ajax";
import { urls } from "../../modules/urls";
import { groupId } from "../../modules/consts";

export class ProductPage {
  private parent: HTMLElement;
  private id: string;

  constructor(parent: HTMLElement, id: string) {
    this.parent = parent;
    this.id = id;
  }

  private getData(): void {
    ajax.post(urls.getUserInfo(this.id), (data: any) => {
      this.renderData(data.response);
    });
  }

  private get pageRoot(): HTMLElement {
    return document.getElementById('product-page') as HTMLElement;
  }

  private getHTML(): string {
    return `<div id="product-page"></div>`;
  }

  private renderData(item: any[]): void {
    const product = new ProductComponent(this.pageRoot);
    product.render(item[0]);
  }

  private clickBack(): void {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render(): void {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));

    this.getData();
  }
}