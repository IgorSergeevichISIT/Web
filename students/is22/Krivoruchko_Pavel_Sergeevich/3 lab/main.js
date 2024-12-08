import { MainPage } from "./pages/main/index.js";
import { SubjectPage } from "./pages/subject/index.js";

const mainContainer = document.getElementById('main-container');
const navigateTo = (page, data) => {
if (page === 'subject') {
    const subjectPage = new SubjectPage(mainContainer);
    subjectPage.render(data);
} else {
    const mainPage = new MainPage(mainContainer, navigateTo);
    mainPage.render();
}
};

const mainPage = new MainPage(mainContainer, navigateTo);
mainPage.render();