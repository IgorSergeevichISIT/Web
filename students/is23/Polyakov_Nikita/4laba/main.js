// main.js
import MainPage from './pages/main/index.js';
import UserPage from './pages/user/index.js';

class App {
    constructor() {
        this.root = document.getElementById('app');
        this.currentPage = null;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        this.handleRoute(); // Инициализация при загрузке
    }

    handleRoute() {
        const hash = window.location.hash;

        if (hash === '' || hash === '#main' || hash === '#') {
            this.showMainPage();
        } else if (hash.startsWith('#user/')) {
            this.showUserPage();
        } else {
            this.showMainPage();
        }
    }

    showMainPage() {
        if (this.currentPage) {
            this.currentPage = null;
        }
        this.currentPage = new MainPage(this.root);
        this.currentPage.render();
    }

    showUserPage() {
        if (this.currentPage) {
            this.currentPage = null;
        }
        this.currentPage = new UserPage(this.root);
        this.currentPage.render();
    }
}

new App();