import { AccordionComponent } from "../../components/accordion/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { urls } from "../../modules/urls.js";

export class UserPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        console.log("Загружаем информацию о пользователе ID:", this.id);
        
        ajax.get(urls.getUserInfo(this.id), (data) => {
            console.log("Данные пользователя:", data);
            
            if (data.error) {
                console.error("Ошибка API:", data.error);
                this.showError();
                return;
            }
            
            if (data.response && data.response[0]) {
                this.renderData(data.response[0]);
            } else {
                console.error("Неправильная структура ответа:", data);
                this.showError();
            }
        });
    }

    showError() {
        this.pageRoot.innerHTML = `
            <div class="alert alert-danger">
                Не удалось загрузить информацию о пользователе
                <button class="btn btn-warning mt-2" id="back-from-error">Вернуться</button>
            </div>
        `;
        
        document.getElementById('back-from-error').addEventListener('click', () => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });
    }

    renderData(userData) {
        let bdateFormatted = "Не указана";
        let yearHidden = false;
        
        if (userData.bdate) {
            const parts = userData.bdate.split('.');
            
            if (parts.length === 3) {
                bdateFormatted = `${parts[0]}.${parts[1]}.${parts[2]}`;
                yearHidden = false;
            } else if (parts.length === 2) {
                bdateFormatted = `${parts[0]}.${parts[1]}`;
                yearHidden = true;
            } else {
                bdateFormatted = userData.bdate;
            }
        }

        let city = "Не указан";
        if (userData.city && userData.city.title) {
            city = userData.city.title;
        }

        let sex = "Не указан";
        if (userData.sex === 1) sex = "Женский";
        if (userData.sex === 2) sex = "Мужской";

        let relation = "Не указано";
        const relations = {
            1: "Не женат/не замужем",
            2: "Есть друг/подруга", 
            3: "Помолвлен/помолвлена",
            4: "Женат/замужем",
            5: "Всё сложно",
            6: "В активном поиске",
            7: "Влюблён/влюблена",
            8: "В гражданском браке"
        };
        if (userData.relation && relations[userData.relation]) {
            relation = relations[userData.relation];
        }

        const online = userData.online ? "✅ В сети" : "❌ Не в сети";

        let lastSeen = "Неизвестно";
        if (userData.last_seen) {
            const lastSeenDate = new Date(userData.last_seen.time * 1000);
            lastSeen = lastSeenDate.toLocaleString("ru-RU");
        }

        let friendsCount = "Нет информации";
        if (userData.counters && userData.counters.friends !== undefined) {
            friendsCount = userData.counters.friends;
        }
        let personalInfo = "";
        
        if (userData.personal) {
            const personal = userData.personal;

            let politicalViews = "Не указаны";
            const politicalOptions = {
                1: "Коммунистические",
                2: "Социалистические",
                3: "Умеренные",
                4: "Либеральные",
                5: "Консервативные",
                6: "Монархические",
                7: "Ультраконсервативные",
                8: "Индифферентные",
                9: "Либертарианские"
            };
            if (personal.political && politicalOptions[personal.political]) {
                politicalViews = politicalOptions[personal.political];
            }

            let religion = personal.religion || "Не указана";

            let lifeMain = "Не указано";
            const lifeMainOptions = {
                1: "Семья и дети",
                2: "Карьера и деньги",
                3: "Развлечения и отдых",
                4: "Наука и исследования",
                5: "Совершенствование мира",
                6: "Саморазвитие",
                7: "Красота и искусство",
                8: "Слава и влияние"
            };
            if (personal.life_main && lifeMainOptions[personal.life_main]) {
                lifeMain = lifeMainOptions[personal.life_main];
            }

            let peopleMain = "Не указано";
            const peopleMainOptions = {
                1: "Ум и креативность",
                2: "Доброта и честность",
                3: "Красота и здоровье",
                4: "Власть и богатство",
                5: "Смелость и упорство",
                6: "Юмор и жизнелюбие"
            };
            if (personal.people_main && peopleMainOptions[personal.people_main]) {
                peopleMain = peopleMainOptions[personal.people_main];
            }

            let smoking = "Не указано";
            const smokingOptions = {
                1: "Резко негативное",
                2: "Негативное",
                3: "Компромиссное",
                4: "Нейтральное",
                5: "Положительное"
            };
            if (personal.smoking && smokingOptions[personal.smoking]) {
                smoking = smokingOptions[personal.smoking];
            }

            let alcohol = "Не указано";
            const alcoholOptions = {
                1: "Резко негативное",
                2: "Негативное",
                3: "Компромиссное",
                4: "Нейтральное",
                5: "Положительное"
            };
            if (personal.alcohol && alcoholOptions[personal.alcohol]) {
                alcohol = alcoholOptions[personal.alcohol];
            }

            let inspiredBy = personal.inspired_by || "Не указаны";
            
            personalInfo = `
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Политические взгляды:</strong> ${politicalViews}</p>
                        <p><strong>Религия:</strong> ${religion}</p>
                        <p><strong>Главное в жизни:</strong> ${lifeMain}</p>
                        <p><strong>Главное в людях:</strong> ${peopleMain}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Отношение к курению:</strong> ${smoking}</p>
                        <p><strong>Отношение к алкоголю:</strong> ${alcohol}</p>
                        <p><strong>Вдохновляют:</strong> ${inspiredBy}</p>
                    </div>
                </div>
            `;
        } else {
            personalInfo = "<p class='text-muted'>Информация о жизненной позиции не указана</p>";
        }

        const accordionData = [
            {
                id: 1,
                title: "👤 Основная информация",
                content: `
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${userData.photo_400_orig || 'https://via.placeholder.com/400'}" 
                                 class="img-fluid rounded mb-3" 
                                 alt="${userData.first_name} ${userData.last_name}"
                                 style="max-width: 200px;">
                            <h4>${userData.first_name} ${userData.last_name}</h4>
                            <p class="text-muted">ID: ${userData.id}</p>
                        </div>
                        <div class="col-md-8">
                            <p><strong>Статус:</strong> ${online}</p>
                            <p><strong>Пол:</strong> ${sex}</p>
                            <p><strong>Дата рождения:</strong> ${bdateFormatted}</p>
                            ${yearHidden ? '<p class="text-muted small"><em>Год рождения скрыт пользователем</em></p>' : ''}
                            <p><strong>Семейное положение:</strong> ${relation}</p>
                        </div>
                    </div>
                `
            },
            {
                id: 2,
                title: "📍 География и активность",
                content: `
                    <p><strong>Город:</strong> ${city}</p>
                    <p><strong>Последний вход:</strong> ${lastSeen}</p>
                    <p><strong>Друзей:</strong> ${friendsCount}</p>
                `
            },
            {
                id: 3,
                title: "🎭 Жизненная позиция",
                content: personalInfo
            },
            {
                id: 4,
                title: "🔗 Ссылки",
                content: `
                    <a href="https://vk.com/id${userData.id}" target="_blank" class="btn btn-outline-primary">
                        Открыть профиль ВКонтакте
                    </a>
                `
            }
        ];

        const accordion = new AccordionComponent(this.pageRoot);
        accordion.render(accordionData);
    }

    get pageRoot() {
        return document.getElementById('user-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="user-page"></div>
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

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}