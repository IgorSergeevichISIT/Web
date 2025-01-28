import { MainPage } from "../main/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"

import {axioss} from '../../modules/axios.js';

export class AddDog {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getHTML() {
        return (
            `
                <form id="dogForm">
                    <div class="mb-3">
                        <label for="dogName" class="form-label">Имя собаки</label>
                        <input type="text" class="form-control" id="dogName" required>
                    </div>
                    <div class="mb-3">
                        <label for="dogDescription" class="form-label">Описание собаки</label>
                        <textarea class="form-control" id="dogDescription" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="dogImage" class="form-label">Ссылка на фото собаки</label>
                        <input type="url" class="form-control" id="dogImage" required>
                    </div>
                    <div class='line'>
                        <div id='mybt'></div>
                        <button type="submit" class="btn btn-primary">Добавить</button>
                    </div>
                </form>
            `
        )
    }

    addListener() {
        const form = document.getElementById('dogForm');

        
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const dogName = document.getElementById('dogName').value;
            const dogDescription = document.getElementById('dogDescription').value; 
            const dogImage = document.getElementById('dogImage').value; 
            
            axioss.findstocks((data) => {
                const iddog = data.length + 1;
                insertdog(iddog);
            })
            
           function insertdog(dogid) {
                const dog =  {
                    id: dogid,
                    name: dogName,
                    src: dogImage,
                    info: dogDescription,
                    pos: `${dogid}`,
                    show: "",
                    collapse: ""
                }
                axioss.addstock(dog);
           }
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

        const backButton = new BackButtonComponent(document.getElementById('mybt'))
        backButton.render(this.clickBack.bind(this))
        this.addListener();
    }
}