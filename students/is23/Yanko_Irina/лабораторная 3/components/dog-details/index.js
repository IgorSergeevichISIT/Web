export class DogDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="row">
                <div class="col-md-6">
                    <img src="${data.image}" class="img-fluid rounded" alt="${data.breed}">
                </div>
                <div class="col-md-6">
                    <h2>${data.breed}</h2>
                    <p class="lead">${data.fullDescription}</p>
                    <div class="mt-3">
                        <h5>Характеристики:</h5>
                        <ul>
                            <li><strong>Размер:</strong> ${data.size}</li>
                            <li><strong>Вес:</strong> ${data.weight}</li>
                            <li><strong>Продолжительность жизни:</strong> ${data.lifespan}</li>
                            <li><strong>Темперамент:</strong> ${data.temperament}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}