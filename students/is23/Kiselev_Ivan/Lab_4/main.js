import { MainPage } from './pages/MainPage.js';
import { UserPage } from './pages/UserPage.js';


const appContainer = document.getElementById('app');


let currentPage = null;


function showMainPage() {
  if (currentPage) {
    currentPage = null; 
  }

  currentPage = new MainPage(appContainer, (userId) => {
    showUserPage(userId);
  });
  currentPage.render();
}


function showUserPage(userId) {
  if (currentPage) {
    currentPage = null;
  }

  currentPage = new UserPage(appContainer, userId, () => {
    showMainPage();
  });
  currentPage.render();
}

showMainPage();