import { MainPage } from "../main/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"

import {axioss} from '../../modules/axios.js';

export class DeleteDog {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getHTML() {
        return (
            `
                <form id="dogForm">
                    <div class="mb-3">
                        <label for="dogID" class="form-label">Id собаки</label>
                        <input type="text" class="form-control" id="dogID" required>
                        <div id='error'></div>
                    </div>
                    <div class="line">
                        <div id="mybut"></div>
                        <button type="submit" class="btn btn-primary">Удалить</button>
                    </div>
                </form>
            `
        )
    }

    addListener() {
        const form = document.getElementById('dogForm');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const dogID = document.getElementById('dogID').value;

            axioss.deletestock(dogID, (error) => {
                if (error !== null) {
                    const err = document.getElementById('error');
                    err.innerHTML = error;
                }
            })

        });
    }

    clickBack() {
        axioss.findstocks((data) =>{
            const id = data[0].id;
            const mainPage = new MainPage(root, id);
            mainPage.render();
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(document.getElementById('mybut'))
        backButton.render(this.clickBack.bind(this))
        this.addListener();
    }
}