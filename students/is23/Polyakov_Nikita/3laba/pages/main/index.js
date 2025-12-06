import { AccordionComponent } from "../../components/accordion/index.js";

export class MainPage {
    constructor(parent, onDogSelect) {
        this.parent = parent;
        this.onDogSelect = onDogSelect; 
    }

getDogData() {
    return [
        {
            id: 'labrador',
            title: 'Лабрадор-ретривер',
            content: `
                <img src="assets/Ретривер.webp" class="dog-card-img" alt="Лабрадор">
                <div class="dog-content">
                    <p class="breed-desc">Дружелюбный, умный и активный. Отличный компаньон для семьи.</p>
                    <button type="button" class="btn btn-info details-btn" data-id="labrador">Подробнее</button>
                </div>
            `
        },
        {
            id: 'husky',
            title: 'Хаски',
            content: `
                <img src="assets/Хаски.jpg" class="dog-card-img" alt="Хаски">
                <div class="dog-content">
                    <p class="breed-desc">Энергичный, независимый и очень красивый. Любит бегать и "разговаривать" воем!</p>
                    <button type="button" class="btn btn-info details-btn" data-id="husky">Подробнее</button>
                </div>
            `
        },
        {
            id: 'bulldog',
            title: 'Бульдог',
            content: `
                <img src="assets/Английский_Бульдок.jpg" class="dog-card-img" alt="Бульдог">
                <div class="dog-content">
                    <p class="breed-desc">Спокойный, упрямый, но очень преданный. Идеален для жизни в квартире.</p>
                    <button type="button" class="btn btn-info details-btn" data-id="bulldog">Подробнее</button>
                </div>
            `
        }
    ];
}

    render() {
        this.parent.innerHTML = '<h1 class="text-center my-4">Породы собак</h1>';

        const accordionContainer = document.createElement('div');
        this.parent.append(accordionContainer);

        const dogs = this.getDogData();
        const accordion = new AccordionComponent(accordionContainer, dogs, (dogId) => {
            this.onDogSelect(dogId);
        });
        accordion.render();
    }
}