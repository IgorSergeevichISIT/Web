import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

//Global state
let appState = {
    items: [],
    nextIndex: 0
};

const initialData = [
    { id: 1, src: "images/image1.jpg", title: "Скидка 20% на первый депозит!", text: "Откройте счёт сегодня и получите 20% в подарок. Успейте до конца месяца!", actionText: "Связаться с нами", toastMessage: "Менеджер свяжется с вами в течение 15 минут!" },
    { id: 2, src: "images/image2.jpg", title: "Бесплатный анализ портфеля", text: "Получите профессиональную оценку ваших инвестиций от наших экспертов. Без обязательств!", actionText: "Запросить анализ", toastMessage: "Анализ отправлен! Ожидайте звонка." },
    { id: 3, src: "images/image3.jpg", title: "Кэшбэк 10% на все операции", text: "Каждая сделка приносит вам деньги обратно. Начните экономить уже сегодня!", actionText: "Активировать кэшбэк", toastMessage: "Кэшбэк активирован! Ваши операции теперь приносят бонусы." }
];

for (let i = 0; i < 3; i++) {
    appState.items.push({ ...initialData[i], uid: 'card_' + (Date.now() + i) });
    appState.nextIndex = (appState.nextIndex + 1) % initialData.length;
}

window.showMainPage = () => {
    const mainPage = new MainPage(root, appState, initialData);
    mainPage.render();
};

showMainPage();