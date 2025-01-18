export class Filter {
    constructor (parent) {
        this.parent = parent;
        this.html = "";
    }

    getHTML() {
        return (
            `
                <div class="input mb-3" style="width: 300px;">
                    <input type="text" class="form-control" placeholder="Название" id="title">
                    <input type="text" class="form-control" placeholder="Текст" id="text">
                </div>
                <div class="card" style="width: 300px;">
                    <div class="card-body d-flex justify-content-center">
                        <button class="btn btn-primary m-3" id="filterByFriends"">Добавить карточку</button>
                    </div>
                </div>
            `
        )
    }

    addListeners(listenerByFriends) {
        const title =  document.getElementById("title")
        const text =  document.getElementById("text")
        document
            .getElementById("filterByFriends")
            .addEventListener("click", () => {
                listenerByFriends(title, text)
            })
    }
    
    render(listenerByFriends) {
        this.html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', this.html)
        this.addListeners(listenerByFriends)
    }
}