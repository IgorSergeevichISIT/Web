import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');

document.body.style.height = '100vh';
document.body.style.background = 'rgb(255, 255, 255)';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';

const mainPage = new MainPage(root);
mainPage.render();