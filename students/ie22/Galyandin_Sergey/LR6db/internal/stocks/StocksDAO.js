const {StocksRepository} = require('./StocksRespository.js');
const {Stock} = require('../../models.js')

class StockDAO {
    constructor(id, src, title, text) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.text = text;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(stock) {
        if (
            stock.src === undefined ||
            stock.title === undefined || stock.title === "" ||
            stock.text === undefined || stock.text === ""
        ) {
            throw new Error('invalidate stock data');
        }

    }

    static async find() {
        const stocks = await Stock.findAll()
        return stocks.map(({id, src, title, text}) => {
            return new this(id, src, title, text);
        });
    }

    static async findById(id) {
        console.log(id)
        this._validateId(id);

        const stock = await Stock.findByPk(id)

        return new this(stock.id, stock.src, stock.title, stock.text);
    }

    static async insert(stock) {
        this._validate(stock);

        Stock.create(stock)

        return new this(stock.id, stock.src, stock.title, stock.text);
    }

    static async delete(id) {
        this._validateId(id);
        
        await Stock.destroy({
            where: {
                id: id,
            },
        });

        return filteredStocks.map(({id, src, title, text}) => {
            return new this(id, src, title, text);
        });
    }

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            title: this.title,
            text: this.text,
        }
    }
}

module.exports = {
    StockDAO,
}