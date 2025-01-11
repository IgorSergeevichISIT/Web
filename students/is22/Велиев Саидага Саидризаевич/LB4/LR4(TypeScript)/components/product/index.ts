export class ProductComponent {
    private parent: HTMLElement;
  
    constructor(parent: HTMLElement) {
      this.parent = parent;
    }
  
    private getHTML(data: any): string {
      return (
        `<div class="card mb-3" style="width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${data.photo_400_orig}" class="img-fluid" alt="картинка">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    </div>
                </div>
            </div>
        </div>`
      );
    }
  
    render(data: any): void {
      this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
  }
  