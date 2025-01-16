import { NavBar } from "./components/NavBar.js";
import { HomePage } from "./pages/HomePage.js";

const root = document.getElementById('root');
const nav = document.getElementById('nav');

function app () {
    const homePage = new HomePage(root);
    const navBar = new NavBar(root, nav);
    homePage.render();
    navBar.render();
}

app();