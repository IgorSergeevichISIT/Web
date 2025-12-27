export class Image {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        return [
            {id: 1, src: "https://i.pinimg.com/1200x/65/a2/29/65a229595af67e8dde70fbe1083f140f.jpg"},
            {id: 2, src: "https://i.pinimg.com/1200x/92/d2/f2/92d2f2613b7eb886abb45fa073c95f17.jpg"},
            {id: 3, src: "https://i.pinimg.com/1200x/bb/99/bf/bb99bfa277eb507ae5083e0fcd3002d2.jpg"},
            {id: 4, src: "https://i.pinimg.com/1200x/c7/e8/cb/c7e8cba17e027170205264b1e5c1d7db.jpg"},
            {id: 5, src: "https://i.pinimg.com/1200x/f1/3f/39/f13f3942adc017ae703dc051240fd50f.jpg"},
            {id: 6, src: "https://i.pinimg.com/1200x/da/60/a1/da60a1a16f53f3bec2fdfd12831bfeb0.jpg"},
            {id: 7, src: "https://i.pinimg.com/1200x/1b/8c/ae/1b8cae39c5ba0667fa4f9c7c84456dd8.jpg"},
            {id: 8, src: "https://i.pinimg.com/1200x/df/46/e8/df46e886a2ad97fa358de8985a792d5f.jpg"}
        ];
    }

    getImage(src) {
        return `
        <div class="new-display image-container">
            <img class="card-img-top" src="${src}" alt="картинка">
        </div>
        `;
    }

    render() {
        const data = this.getData();
        const item = data.find(item => item.id === this.id);
        
        if (item) {
            const imageHTML = this.getImage(item.src);
            this.parent.insertAdjacentHTML('beforeend', imageHTML);
        }
    }
}
