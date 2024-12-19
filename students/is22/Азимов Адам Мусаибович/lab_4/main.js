// import { sortVk } from "./Modules/consts.js";
import {MainPage} from "./Pages/main/index.js";


let sortVk="id_desc";
const root = document.getElementById('root');
const mainPage = new MainPage(root,sortVk);

document.getElementById("liveToastBtn").addEventListener("click", () => { 
    if (sortVk == "id_desc")
    {
        sortVk="id_asc"
    }
    else
    {
        sortVk = "id_desc"
    }
    
    mainPage.vkSort = sortVk; // Обновляем сортировку в объекте
    mainPage.render();

  console.log(sortVk);
    
})

mainPage.render();  