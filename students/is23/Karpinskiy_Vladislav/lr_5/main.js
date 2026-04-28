import {MainPage} from "/Web-lab/lr_5/pages/MainPage.js"
import {UserPage} from "/Web-lab/lr_5/pages/UserPage.js"

const root = document.getElementById('app')

function router() {
    const hash = window.location.hash

    if (hash.startsWith('#user/')) {
        const id = hash.split('/')[1]
        const page = new UserPage(root, id)
        page.render()
    } else {
        const page = new MainPage(root)
        page.render()
    }
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)