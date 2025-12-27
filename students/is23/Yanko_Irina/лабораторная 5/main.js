// main.js
import { MainPage } from "./pages/main/MainPage.js";
import { UserPage } from "./pages/user/UserPage.js"; // ← используем UserPage

class App {
    constructor() {
        this.routes = [
            {path: "", page: MainPage},
            {path: "product", page: UserPage} // ← UserPage для product
        ]
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.route();
        });
        
        this.route();
    }

    route() {
        const url = window.location.hash.slice(1);
        const parts = url.split('/');
        const path = parts[0];
        const id = parts[1];
        
        const route = this.routes.find(r => r.path === path);
        
        if (!route) {
            this.renderPage(MainPage);
            return;
        }
        
        const page = new route.page(document.getElementById('app'), id);
        page.render();
    }

    renderPage(PageClass) {
        const page = new PageClass(document.getElementById('app'));
        page.render();
    }
}

const app = new App();
app.init();