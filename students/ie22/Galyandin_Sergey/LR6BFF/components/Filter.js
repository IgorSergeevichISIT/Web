export class Filter {
    constructor (parent) {
        this.parent = parent;
        this.html = "";
    }

    getHTML() {
        return (
            `
            <div class="card" style="width: 750px;">
                <div class="card-body d-flex justify-content-center">
                    <button class="btn btn-primary m-3" id="filterByFriends"">Фильтр по друзьям</button>
                    <button class="btn btn-primary m-3" id="filterByAdmins"">Фильтр по админам</button>
                    <button class="btn btn-primary m-3" id="clearFilters"">Удалить фильтры</button>
                </div>
            </div>
        `
        )
    }

    addListeners(listenerByFriends, listenerByAdmins, clearFilters) {
        document
            .getElementById("filterByFriends")
            .addEventListener("click", listenerByFriends)
        
            document
            .getElementById("filterByAdmins")
            .addEventListener("click", listenerByAdmins)

            document
            .getElementById("clearFilters")
            .addEventListener("click", clearFilters)
    }
    
    render(listenerByFriends, listenerByAdmins, clearFilters) {
        this.html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', this.html)
        this.addListeners(listenerByFriends, listenerByAdmins, clearFilters)
    }
}