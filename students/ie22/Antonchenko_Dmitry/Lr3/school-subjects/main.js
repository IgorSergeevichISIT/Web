const root = document.getElementById('root');

const subjects = [
    {
        id: 1,
        title: 'Математика',
        description: 'Учите алгебру и геометрию',
        img: 'assets/math.jpg',
        carouselImages: [
            'assets/math1.jpg',
            'assets/math2.jpg',
            'assets/math3.jpg'
        ]
    },
    {
        id: 2,
        title: 'Физика',
        description: 'Изучайте законы природы',
        img: 'assets/physics.jpg',
        carouselImages: [
            'assets/physics1.jpg',
            'assets/physics2.jpg',
            'assets/physics3.jpg'
        ]
    },
];

function showMainPage() {
    root.innerHTML = `
        <h1 class="text-4xl text-center text-white my-8 font-semibold gradient-text">Учебные предметы</h1>
        <div id="main-page" class="flex flex-wrap justify-center gap-6"></div>
    `;

    const container = document.getElementById('main-page');
    subjects.forEach(subject => {
        const cardHTML = `
            <div class="card w-72 bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
                <img src="${subject.img}" alt="${subject.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h5 class="text-xl font-semibold">${subject.title}</h5>
                    <p class="text-gray-600 text-sm mt-2">${subject.description}</p>
                    <button class="btn mt-4 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:outline-none focus:ring focus:ring-blue-300" id="btn-${subject.id}">Подробнее</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);

        document.getElementById(`btn-${subject.id}`).addEventListener("click", () => showSubjectPage(subject));
    });
}

function showSubjectPage(subject) {
    root.innerHTML = `
        <div id="subject-page" class="container mx-auto p-4 relative">
            <button id="back-button" class="absolute top-5 right-5 bg-indigo-500 text-white px-6 py-2 rounded-full focus:outline-none focus:ring focus:ring-indigo-300">Назад</button>
            <h1 class="text-4xl font-semibold text-center mt-10">${subject.title}</h1>
            <p class="text-lg text-center mt-2 text-gray-600">${subject.description}</p>
            <div id="carousel-container" class="mt-6">
                <!-- Карусель будет здесь -->
            </div>
        </div>
    `;

    const carouselContainer = document.getElementById("carousel-container");

    // Создаем HTML для карусели с динамическими изображениями
    carouselContainer.innerHTML = `
        <div class="relative w-full max-w-3xl mx-auto">
            <div class="overflow-hidden rounded-lg relative">
                <div class="carousel-inner flex transition-transform duration-700 ease-in-out">
                    ${subject.carouselImages.map((img, index) => `
                        <div class="carousel-item w-full flex-shrink-0 ${index === 0 ? 'block' : 'hidden'}">
                            <img src="${img}" class="w-full object-cover" alt="${subject.title}">
                        </div>
                    `).join('')}
                </div>
                <button class="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50" id="prev-button">&#60;</button>
                <button class="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50" id="next-button">&#62;</button>
            </div>
        </div>
    `;

    // Назад к главной странице
    document.getElementById("back-button").addEventListener("click", showMainPage);

    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-item");

    document.getElementById("next-button").addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    document.getElementById("prev-button").addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle("block", index === currentSlide);
            slide.classList.toggle("hidden", index !== currentSlide);
        });
    }
}

showMainPage();
