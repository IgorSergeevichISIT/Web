import { MainPage } from "./pages/main";

const root = document.getElementById('root') as HTMLElement;
const mainPage = new MainPage(root);
mainPage.render();