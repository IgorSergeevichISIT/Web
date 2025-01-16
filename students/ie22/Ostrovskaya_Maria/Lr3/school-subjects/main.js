var root = document.getElementById('root');
var subjects = [
    {
        id: 1,
        title: 'Программирование',
        description: 'Учитесь кодить вместе с нами',
        img: 'assets/math.jpg',
        carouselImages: [
            'assets/math1.jpg',
            'assets/math2.jpg',
            'assets/math3.jpg'
        ]
    },
    {
        id: 2,
        title: 'Русский язык',
        description: 'Изучайте все изъяны языка только у нас',
        img: 'assets/physics.jpg',
        carouselImages: [
            'assets/physics1.jpg',
            'assets/physics2.jpg',
            'assets/physics3.jpg'
        ]
    },
];
function showMainPage() {
    root.innerHTML = "\n        <h1 class=\"text-4xl text-center text-white my-8 font-semibold gradient-text\">\u0423\u0447\u0435\u0431\u043D\u044B\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B</h1>\n        <div id=\"main-page\" class=\"flex flex-wrap justify-center gap-6\"></div>\n    ";
    var container = document.getElementById('main-page');
    subjects.forEach(function (subject) {
        var cardHTML = "\n            <div class=\"card w-72 bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300\">\n                <img src=\"".concat(subject.img, "\" alt=\"").concat(subject.title, "\" class=\"w-full h-48 object-cover\">\n                <div class=\"p-4\">\n                    <h5 class=\"text-xl font-semibold\">").concat(subject.title, "</h5>\n                    <p class=\"text-gray-600 text-sm mt-2\">").concat(subject.description, "</p>\n                    <button class=\"btn mt-4 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full focus:outline-none focus:ring focus:ring-blue-300\" id=\"btn-").concat(subject.id, "\">\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</button>\n                </div>\n            </div>\n        ");
        container.insertAdjacentHTML('beforeend', cardHTML);
        var button = document.getElementById("btn-".concat(subject.id));
        button.addEventListener("click", function () { return showSubjectPage(subject); });
    });
}
function showSubjectPage(subject) {
    var _a, _b, _c;
    root.innerHTML = "\n        <div id=\"subject-page\" class=\"container mx-auto p-4 relative\">\n            <button id=\"back-button\" class=\"absolute top-5 right-5 bg-indigo-500 text-white px-6 py-2 rounded-full focus:outline-none focus:ring focus:ring-indigo-300\">\u041D\u0430\u0437\u0430\u0434</button>\n            <h1 class=\"text-4xl font-semibold text-center mt-10\">".concat(subject.title, "</h1>\n            <p class=\"text-lg text-center mt-2 text-gray-600\">").concat(subject.description, "</p>\n            <div id=\"carousel-container\" class=\"mt-6\">\n                <!-- \u041A\u0430\u0440\u0443\u0441\u0435\u043B\u044C \u0431\u0443\u0434\u0435\u0442 \u0437\u0434\u0435\u0441\u044C -->\n            </div>\n        </div>\n    ");
    var carouselContainer = document.getElementById("carousel-container");
    // Создаем HTML для карусели с динамическими изображениями
    carouselContainer.innerHTML = "\n        <div class=\"relative w-full max-w-3xl mx-auto\">\n            <div class=\"overflow-hidden rounded-lg relative\">\n                <div class=\"carousel-inner flex transition-transform duration-700 ease-in-out\">\n                    ".concat(subject.carouselImages.map(function (img, index) { return "\n                        <div class=\"carousel-item w-full flex-shrink-0 ".concat(index === 0 ? 'block' : 'hidden', "\">\n                            <img src=\"").concat(img, "\" class=\"w-full object-cover\" alt=\"").concat(subject.title, "\">\n                        </div>\n                    "); }).join(''), "\n                </div>\n                <button class=\"absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50\" id=\"prev-button\">&#60;</button>\n                <button class=\"absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50\" id=\"next-button\">&#62;</button>\n            </div>\n        </div>\n    ");
    // Назад к главной странице
    (_a = document.getElementById("back-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", showMainPage);
    var currentSlide = 0;
    var slides = document.querySelectorAll(".carousel-item");
    (_b = document.getElementById("next-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });
    (_c = document.getElementById("prev-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });
    function updateCarousel() {
        slides.forEach(function (slide, index) {
            slide.classList.toggle("block", index === currentSlide);
            slide.classList.toggle("hidden", index !== currentSlide);
        });
    }
}
showMainPage();
