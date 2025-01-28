import { InfoDogComponent } from "../../components/infodog/index.js"
import { MainPage } from "../main/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"

import {axioss} from '../../modules/axios.js';

export class IngoDogPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
       axioss.findstockbyid(this.id, (data) => { 
        this.renderData(data);
       })
    }

    renderData(data) {
        const infodog = new InfoDogComponent(this.pageRoot)
        infodog.render(data)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
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
        const mainPage = new MainPage(this.parent, this.id)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData();

    }
}