class Urls {
    constructor() {
        this.url = 'http://localhost:8000'
    }

    getAllInfo() {
        return `${this.url}/stocks`;
    }

    getById(id) {
        return `${this.url}/stocks/${id}`
    } 
    deleteById(id)
    {
        return`${this.url}/stocks/delete/${id}`
    }
    addCard()
    {
        return `${this.url}/stocks/add`
    }
}

export const urls = new Urls()