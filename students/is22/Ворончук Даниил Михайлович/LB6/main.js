import {MainPage} from "./pages/main/index.js"
import { axioss } from "./modules/axios.js";

const root = document.getElementById('root');

axioss.findstocks((data) =>{
    const id = data[0].id;
    const mainPage = new MainPage(root, id);
    mainPage.render();
})




