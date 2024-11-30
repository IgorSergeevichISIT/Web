export class CarouselComponent {
    constructor(parent, navigateTo) {
        this.parent = parent;
        this.navigateTo = navigateTo;
        this.currentSlideIndex = 0;
        this.interval = null;
    }

    getHTML(data) {
        const slides = data
            .map(
                (item, index) => `
                <div class="carousel-item ${index === 0 ? 'block' : 'hidden'} relative">
                    <img src="${item.src}" alt="${item.title}" class="w-full rounded-lg">
                    <div class="absolute inset-0 flex flex-col justify-end items-center text-white bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                        <div class="p-4 text-center">
                        <h5 class="text-2xl font-bold mb-2">${item.title}</h5>
                        <p class="text-lg mb-4">${item.description}</p>
                        <button class="bg-customRed text-white px-4 py-2 rounded hover:bg-customRed subject-button" data-title="${item.title}">Подробнее</button>
                        </div>
                    </div>
                </div>
                `
            )
            .join('');
    
        return `
            <div id="subjectsCarousel" class="relative z-10">
            <div class="carousel-inner space-y-4">
                ${slides}
            </div>
            <!-- Кнопка "предыдущий" -->
            <div class="absolute inset-y-0 left-0 flex items-center z-20">
                <button class="carousel-control-prev text-2xl px-4" data-bs-slide="prev"><</button>
            </div>
            <!-- Кнопка "следующий" -->
            <div class="absolute inset-y-0 right-0 flex items-center z-20">
                <button class="carousel-control-next text-2xl px-4" data-bs-slide="next">></button>
            </div>
            </div>

        `;
    }

    startAutoSlide(data) {
        this.interval = setInterval(() => {
            this.showNextSlide(data);
        }, 3000); // 3 секунды
    }

    stopAutoSlide() {
        clearInterval(this.interval);
    }

    showSlide(data, index) {
        const slides = this.parent.querySelectorAll('.carousel-item');
        slides.forEach((slide, i) => {
            slide.classList.toggle('block', i === index);
            slide.classList.toggle('hidden', i !== index);
        });
        this.currentSlideIndex = index;
    }

    showNextSlide(data) {
        const nextIndex = (this.currentSlideIndex + 1) % data.length;
        this.showSlide(data, nextIndex);
    }

    showPrevSlide(data) {
        const prevIndex = (this.currentSlideIndex - 1 + data.length) % data.length;
        this.showSlide(data, prevIndex);
    }

    render(data) {
        this.parent.innerHTML = this.getHTML(data);

        const buttons = this.parent.querySelectorAll('.subject-button');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.navigateTo('subject', data[index]);
            });
        });

        const nextButton = this.parent.querySelector('.carousel-control-next');
        const prevButton = this.parent.querySelector('.carousel-control-prev');

        nextButton.addEventListener('click', () => {
            this.stopAutoSlide();
            this.showNextSlide(data);
            this.startAutoSlide(data);
        });

        prevButton.addEventListener('click', () => {
            this.stopAutoSlide();
            this.showPrevSlide(data);
            this.startAutoSlide(data);
        });

        this.startAutoSlide(data);
    }
}
