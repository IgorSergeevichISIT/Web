export class SubjectPage {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        this.parent.innerHTML = `
            <section class="container mx-auto p-4">
                <h2 class="text-3xl font-bold mb-6">${data.title}</h2>
                <img src="${data.src}" alt="${data.title}" class="w-full rounded-lg mb-4">
                <p class="text-lg">${data.details}</p>
                <button class="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 back-button">Назад</button>
            </section>
        `;

        const backButton = this.parent.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            location.reload();
        });
    }
}
