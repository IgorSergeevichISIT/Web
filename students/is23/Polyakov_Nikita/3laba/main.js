import { MainPage } from "./pages/main/index.js";
import { DogDetailsPage } from "./pages/dog-details/index.js";

const root = document.getElementById('root');

let currentPage = null;


function showMainPage() {
    currentPage?.destroy?.(); 
    const page = new MainPage(root, (dogId) => {
        showDogDetailsPage(dogId);
    });
    page.render();
    currentPage = page;
}


function showDogDetailsPage(dogId) {
    currentPage?.destroy?.();
    const page = new DogDetailsPage(root, () => {
        showMainPage();
    });
    page.render(dogId);
    currentPage = page;
}

showMainPage();