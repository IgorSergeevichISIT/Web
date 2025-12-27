export class ButtonGroup {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
        <div class="new-display">
            <div class="btn-group dropdown-center">
                <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Зима</button>
                <ul class="dropdown-menu dropdown-menu-winter">
                    <li><button class="dropdown-item dropdown-item-white" id="click-1" data-id="1">День</button></li>
                    <li><button class="dropdown-item dropdown-item-black" id="click-2" data-id="2">Ночь</button></li>
                </ul>
            </div>
            <div class="btn-group dropdown-center">
                <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">Весна</button>
                <ul class="dropdown-menu dropdown-menu-spring">
                    <li><button class="dropdown-item dropdown-item-white" id="click-3" data-id="3">День</button></li>
                    <li><button class="dropdown-item dropdown-item-black" id="click-4" data-id="4">Ночь</button></li>
                </ul>
            </div>
            <div class="btn-group dropdown-center">
                <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Лето</button>
                <ul class="dropdown-menu dropdown-menu-summer">
                    <li><button class="dropdown-item dropdown-item-white" id="click-5" data-id="5">День</button></li>
                    <li><button class="dropdown-item dropdown-item-black" id="click-6" data-id="6">Ночь</button></li>
                </ul>
            </div>
            <div class="btn-group dropdown-center">
                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Осень</button>
                <ul class="dropdown-menu dropdown-menu-autumn">
                    <li><button class="dropdown-item dropdown-item-white" id="click-7" data-id="7">День</button></li>
                    <li><button class="dropdown-item dropdown-item-black" id="click-8" data-id="8">Ночь</button></li>
                </ul>
            </div>
        </div>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.setupListeners(listener);
    }

    setupListeners(listener) {
        const buttons = this.parent.querySelectorAll('[data-id]');
        buttons.forEach(button => {
        button.addEventListener('click', listener);
        });
  }
}
