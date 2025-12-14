import { BadgesComponent } from "../../components/badges/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const products = {
            1: {
                id: 1,
                name: "Свежие яблоки",
                price: "150 руб/кг",
                image: "https://plus.unsplash.com/premium_photo-1673487564182-00d71c6d5d7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
                description: "Сочные красные яблоки сорта 'Гала'. Идеально подходят для употребления в свежем виде, приготовления соков и выпечки. Богаты витаминами и клетчаткой. Собраны в экологически чистых садах Краснодарского края.",
                characteristics: "Вес: 1 кг, Сорт: Гала, Страна происхождения: Россия, Упаковка: экологичная",
                nutrition: "Калорийность: 52 ккал/100г, Белки: 0.3г, Жиры: 0.2г, Углеводы: 14г, Клетчатка: 2.4г",
                storage: "Хранить при температуре от +2°C до +8°C в сухом месте",
                badges: ["новинка", "хит", "акция"],
                tags: ["Сезонные", "Сочные", "Витамины", "Без ГМО", "Экологичные"]
            },
            2: {
                id: 2,
                name: "Молоко Простоквашино",
                price: "89 руб",
                image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D", 
                description: "Пастеризованное молоко 3.2% жирности от здоровых коров. Проходит многоступенчатую очистку и бережную пастеризацию для сохранения всех полезных свойств и вкуса.",
                characteristics: "Объем: 1 л, Жирность: 3.2%, Срок годности: 10 дней, Упаковка: тетрапак",
                nutrition: "Калорийность: 60 ккал/100мл, Белки: 3.2г, Жиры: 3.2г, Углеводы: 4.7г, Кальций: 120 мг",
                storage: "Хранить при температуре от +2°C до +6°C в защищенном от света месте",
                badges: ["хит", "акция"],
                tags: ["Без консервантов", "Высший сорт", "Проверено", "Пастеризованное", "Натуральное"]
            },
            3: {
                id: 3, 
                name: "Хлеб Бородинский",
                price: "65 руб",
                image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWR8ZW58MHx8MHx8fDA%3D",
                description: "Традиционный ржаной хлеб по классическому рецепту с добавлением тмина и кориандра. Имеет плотный мякиш, характерный аромат и хрустящую корочку. Выпекается по старинной технологии.",
                characteristics: "Вес: 500 г, Состав: ржаная мука, пшеничная мука, солод, тмин, кориандр, соль",
                nutrition: "Калорийность: 200 ккал/100г, Белки: 6г, Жиры: 1г, Углеводы: 40г, Клетчатка: 6г", 
                storage: "Хранить при комнатной температуре в бумажном пакете до 5 дней",
                badges: ["новинка", "популярное"],
                tags: ["Ржаной", "С тмином", "Свежий", "Традиционный", "Домашний"]
            },
            4: {
                id: 4,
                name: "Куриное филе", 
                price: "320 руб/кг",
                image: "https://images.unsplash.com/photo-1587332278432-18346cbdc8ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGZpbGV0fGVufDB8fDB8fHww",
                description: "Свежее куриное филе премиум-класса от проверенных поставщиков. Не содержит антибиотиков и гормонов роста. Идеально для диетического питания, приготовления на гриле и детского меню.",
                characteristics: "Вес: 1 кг, Часть: филе грудки, Упаковка: вакуумная, Происхождение: РФ",
                nutrition: "Калорийность: 113 ккал/100г, Белки: 23г, Жиры: 2г, Углеводы: 0г",
                storage: "Хранить при температуре от -2°C до +4°C в оригинальной упаковке",
                badges: ["акция", "рекомендуем"],
                tags: ["Охлажденное", "Без антибиотиков", "Высший сорт", "Диетическое", "Премиум"]
            },
            5: {
                id: 5,
                name: "Сыр Пармезан",
                price: "890 руб/кг",
                image: "https://images.unsplash.com/photo-1552767057-3f9d6591a6e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlfGVufDB8fDB8fHww",
                description: "Настоящий итальянский сыр Пармезан выдержанный 24 месяца. Имеет зернистую структуру и насыщенный пикантный вкус. Идеален для пасты, ризотто и в качестве закуски.",
                characteristics: "Вес: 200 г, Выдержка: 24 месяца, Страна: Италия, Тип: твердый сыр",
                nutrition: "Калорийность: 431 ккал/100г, Белки: 38г, Жиры: 29г, Углеводы: 4.1г, Кальций: 1100 мг",
                storage: "Хранить при температуре +4°C до +8°C в пергаментной бумаге",
                badges: ["премиум", "хит"],
                tags: ["Итальянский", "Выдержанный", "Натуральный", "Для пасты", "Премиум"]
            },
            6: {
                id: 6,
                name: "Свежая клубника",
                price: "290 руб/кг", 
                image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D",
                description: "Сладкая ароматная клубника из Краснодарского края. Собрана вручную в день доставки. Идеальна для десертов, смузи и употребления в свежем виде.",
                characteristics: "Вес: 500 г, Сорт: Альба, Страна: Россия, Сбор: ручной",
                nutrition: "Калорийность: 32 ккал/100г, Белки: 0.7г, Жиры: 0.3г, Углеводы: 7.7г, Витамин C: 59 мг",
                storage: "Хранить в холодильнике при температуре +2°C до +4°C не более 3 дней",
                badges: ["сезонное", "новинка"],
                tags: ["Сезонная", "Сладкая", "Ароматная", "Свежая", "Для десертов"]
            }
        };
        return products[this.id];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="product-page"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        if (!data) {
            this.pageRoot.innerHTML = '<div class="alert alert-danger">Продукт не найден</div>';
            return;
        }
        
        // Добавляем кнопку назад
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        // Добавляем заголовок, изображение и значки
        const headerHTML = `
            <div class="text-center mb-4">
                <h1 class="mb-3">${data.name}</h1>
                <div class="mb-2">
                    <span class="h4 text-primary">${data.price}</span>
                </div>
                <div id="product-badges" class="mb-3"></div>
                <img src="${data.image}" alt="${data.name}" class="img-fluid rounded shadow" style="max-height: 400px; width: 100%; object-fit: cover;">
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', headerHTML);

        // Добавляем значки к продукту
        const badgesContainer = document.getElementById('product-badges');
        const badges = new BadgesComponent(badgesContainer);
        badges.render(data.badges);

        // Добавляем детальную информацию
        const infoHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">📋 Описание</h5>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">${data.description}</p>
                        </div>
                    </div>
                    
                    <div class="card mb-3">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">⚖️ Характеристики</h5>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">${data.characteristics}</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">🍎 Пищевая ценность</h5>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">${data.nutrition}</p>
                        </div>
                    </div>
                    
                    <div class="card mb-3">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">📦 Условия хранения</h5>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">${data.storage}</p>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">🏷️ Теги</h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex flex-wrap gap-1">
                                ${data.tags.map(tag => `
                                    <span class="badge bg-light text-dark border">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-4">
                <button class="btn btn-success btn-lg">
                    🛒 Добавить в корзину за ${data.price}
                </button>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', infoHTML);
    }
}