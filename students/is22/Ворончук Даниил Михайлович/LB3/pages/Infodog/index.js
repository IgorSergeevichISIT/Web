import { InfoDogComponent } from "../../components/infodog/index.js"
import { MainPage } from "../main/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"

export class IngoDogPage {
    constructor(parent, id, src, name, info) {
        this.parent = parent
        this.id = id
        this.name = name
        this.info = info
        this.src = src
    }

    getData() {
        return {
            id: 1,
            src: this.src,
            title: this.name,
            text: this.info
        }
    }

    get pageRoot() {
        return document.getElementById('infodog-page')
    }

    getHTML() {
        return (
            `
                <div id="infodog-page" class="tw-mx-auto tw-my-auto tw-w-[540px]"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render(this.id)
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        const infodog = new InfoDogComponent(this.pageRoot)
        infodog.render(data)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    }
}