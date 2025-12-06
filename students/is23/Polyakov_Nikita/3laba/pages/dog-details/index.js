export class DogDetailsPage {
    constructor(parent, onBack) {
        this.parent = parent;
        this.onBack = onBack;
        this.dogData = {
            labrador: {
                title: 'Лабрадор-ретривер',
                img: 'assets/Ретривер.webp',
                description: 'Лабрадор — одна из самых популярных пород в мире. Он умен, легко обучаем и отлично ладит с детьми. Идеален как для семьи, так и для работы (например, собака-поводырь).'
            },
            husky: {
                title: 'Сибирский хаски',
                img: 'assets/Хаски.jpg',
                description: 'Хаски — потомок северных ездовых собак. Ему нужно много движения, иначе будет скучать и портить мебель! Любит "разговаривать" воем.'
            },
            bulldog: {
                title: 'Английский бульдог',
                img: 'assets/Английский_Бульдок.jpg',
                description: 'Бульдог — символ спокойствия и упрямства. Он не требует много выгула, но сильно храпит и любит спать на диване.'
            }
        };
    }

    render(dogId) {
        const dog = this.dogData[dogId];
        if (!dog) {
            this.parent.innerHTML = '<h2>Порода не найдена</h2>';
            return;
        }

        this.parent.innerHTML = `
            <div class="container mt-4">
                <h1>${dog.title}</h1>
                <img src="${dog.img}" class="img-fluid rounded mb-3" alt="${dog.title}">
                <p>${dog.description}</p>
                <button id="back-btn" class="btn btn-secondary">← Назад к породам</button>
            </div>
        `;

        document.getElementById('back-btn').addEventListener('click', () => {
            this.onBack();
        });
    }
}