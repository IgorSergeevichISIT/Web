import { CatCardComponent } from '../../components/cat-card/index.js';
import { AlertComponent } from '../../components/alert/index.js';
import { CatPage } from '../cat/index.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    /**
     * Получает данные о кошках
     * @returns {Array} массив объектов с данными кошек
     */
    // Используем статическое свойство для хранения данных, чтобы они сохранялись при перерисовке
    static catsData = null;

    /**
     * Получает данные о кошках
     * @returns {Array} массив объектов с данными кошек
     */
    getData() {
        if (!MainPage.catsData) {
            MainPage.catsData = [
            {
                id: 1,
                name: 'Мурзик',
                breed: 'Британская короткошёрстная',
                image: 'images/murzik.jpeg',
                description: 'Мурзик - это спокойный и ласковый кот. Он любит лежать на диване и наблюдать за птицами за окном.',
                age: 3,
                color: 'Серый'
            },
            {
                id: 2,
                name: 'Рыжик',
                breed: 'Персидская кошка',
                image: 'images/rizhik.jpg',
                description: 'Рыжик - энергичный и игривый кот. Он обожает прыгать и охотиться на игрушки.',
                age: 2,
                color: 'Рыжий'
            },
            {
                id: 3,
                name: 'Барсик',
                breed: 'Сиамская кошка',
                image: 'images/barsik.jpg',
                description: 'Барсик - умная и общительная кошка. Она любит разговаривать со своим хозяином.',
                age: 4,
                color: 'Кремовый с тёмными отметинами'
            },
            {
                id: 4,
                name: 'Снежка',
                breed: 'Белая ангорская',
                image: 'images/snejka.jpg',
                description: 'Снежка - нежная и ласковая кошка. Она предпочитает спокойное времяпрепровождение.',
                age: 5,
                color: 'Белый'
            },
            {
                id: 5,
                name: 'Тигра',
                breed: 'Бенгальская кошка',
                image: 'images/tigra.jpg',
                description: 'Тигра - дикая и независимая кошка. Она любит охотиться и исследовать новые места.',
                age: 2,
                color: 'Оранжевый с чёрными полосами'
            },
            {
                id: 6,
                name: 'Луна',
                breed: 'Чёрная кошка',
                image: 'images/luna.webp',
                description: 'Луна - таинственная и элегантная кошка. Она любит ночные приключения.',
                age: 3,
                color: 'Чёрный'
            }
        ];
        }
        return MainPage.catsData;
    }

    /**
     * Добавляет новую кошку (копию первой)
     */
    addCat() {
        const cats = this.getData();
        const firstCat = cats[0];
        const newId = Math.max(...cats.map(c => c.id)) + 1;
        const newCat = {
            ...firstCat,
            id: newId,
            name: `Клон ${firstCat.name} #${newId}`
        };
        cats.push(newCat);
        this.render(); // Перерисовываем страницу
        
        // Показываем Alert уведомление
        const alertsContainer = document.getElementById('alerts-container');
        const alert = new AlertComponent(alertsContainer);
        alert.render({
            type: 'success',
            message: `Кошка "${newCat.name}" успешно добавлена!`,
            id: `alert-${Date.now()}`
        });
    }

    /**
     * Удаляет кошку по ID
     * @param {number} id - ID кошки для удаления
     */
    deleteCat(id) {
        const cats = this.getData();
        const index = cats.findIndex(cat => cat.id === id);
        if (index > -1) {
            const deletedCat = cats.splice(index, 1)[0];
            this.render(); // Перерисовываем страницу
            
            // Показываем Alert уведомление
            const alertsContainer = document.getElementById('alerts-container');
            const alert = new AlertComponent(alertsContainer);
            alert.render({
                type: 'danger',
                message: `Кошка "${deletedCat.name}" удалена.`,
                id: `alert-${Date.now()}`
            });
        }
    }

    /**
     * Получает корневой элемент страницы
     * @returns {HTMLElement} элемент с ID 'main-page'
     */
    get pageRoot() {
        return document.getElementById('main-page');
    }

    /**
     * Генерирует HTML для главной страницы
     * @returns {string} HTML главной страницы
     */
    getHTML() {
        return `
            <div class="container">
                <div class="header">
                    <h1>🐱 Каталог кошек</h1>
                    <p class="text-muted">Выберите кошку, чтобы узнать о ней больше</p>
                    <button id="add-cat-button" class="btn btn-primary mb-3">Добавить кошку</button>
                </div>
                <div id="alerts-container"></div>
                <div id="main-page" class="row"></div>
            </div>
        `;
    }

    /**
     * Обработчик клика по карточке кошки
     * @param {Event} e - событие клика
     */
    clickCard(e) {
        const catId = e.target.dataset.id;
        
        // Показываем Alert уведомление
        const alertsContainer = document.getElementById('alerts-container');
        const alert = new AlertComponent(alertsContainer);
        alert.render({
            type: 'info',
            message: `Вы выбрали кошку #${catId}. Загружаем информацию...`,
            id: `alert-${Date.now()}`
        });

        // Переходим на страницу кошки
        const catPage = new CatPage(this.parent, catId);
        catPage.render();
    }

    /**
     * Отрисовывает главную страницу
     */
    render() {
        // Очищаем содержимое родителя
        this.parent.innerHTML = '';
        
        // Вставляем HTML главной страницы
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Получаем данные о кошках
        const catsData = this.getData();
        
        // Отрисовываем карточку для каждой кошки
        catsData.forEach((cat) => {
            const catCard = new CatCardComponent(this.pageRoot);
            // Передаем метод deleteCat в CatCardComponent
            catCard.render(cat, this.clickCard.bind(this), this.deleteCat.bind(this));
        });

        // Добавляем обработчик для кнопки "Добавить кошку"
        const addButton = document.getElementById('add-cat-button');
        if (addButton) {
            addButton.addEventListener('click', this.addCat.bind(this));
        }
    }
}
