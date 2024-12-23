import {MainPage} from "./pages/main/index.js"

const root = document.getElementById('root')

root.innerHTML = ''
const mainPage = new MainPage(root)
mainPage.render()
