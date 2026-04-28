export class DogCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col">
                <div class="card">
                    <img src="${data.img}" class="card-img-top" alt="${data.name}">

                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>

                        <!-- АККОРДЕОН -->
                        <div>
                            <button class="btn btn-light w-100" id="toggle-${data.id}">
                                Краткая информация
                            </button>

                            <div id="panel-${data.id}" style="display:none; padding:10px;">
                                ${data.short}
                            </div>
                        </div>

                        <!-- КНОПКИ -->
                        <button class="btn btn-primary mt-2" id="btn-more-${data.id}">
                            Подробнее
                        </button>

                        <button class="btn btn-danger mt-2" id="btn-delete-${data.id}">
                            Удалить
                        </button>

                        <button class="btn btn-warning mt-2" id="btn-edit-${data.id}">
                            Редактировать
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onMoreClick, onDeleteClick, onEditClick) {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

        // Подробнее
        document.getElementById(`btn-more-${data.id}`)
            .addEventListener("click", () => onMoreClick(data));

        // Удалить
        document.getElementById(`btn-delete-${data.id}`)
            .addEventListener("click", () => onDeleteClick(data));

        // Редактировать
        document.getElementById(`btn-edit-${data.id}`)
            .addEventListener("click", () => onEditClick(data));

        // АККОРДЕОН (фикс!)
        document.getElementById(`toggle-${data.id}`)
            .addEventListener("click", (e) => {
                e.stopPropagation();

                const panel = document.getElementById(`panel-${data.id}`);

                panel.style.display =
                    panel.style.display === "none" ? "block" : "none";
            });
    }
}