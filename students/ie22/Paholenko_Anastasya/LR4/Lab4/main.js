import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');

document.body.style.height = '100vh';
document.body.style.background = 'linear-gradient(135deg, rgba(50, 45, 188, 0.8), rgba(250, 73, 235, 0.8))';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';

const mainPage = new MainPage(root);
mainPage.render();
