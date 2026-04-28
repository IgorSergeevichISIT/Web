export class DogDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        this.parent.insertAdjacentHTML("beforeend", `
            <h2>${data.name}</h2>
            <img src="${data.img}" width="300">
            <p>${data.full}</p>
        `);
    }
}