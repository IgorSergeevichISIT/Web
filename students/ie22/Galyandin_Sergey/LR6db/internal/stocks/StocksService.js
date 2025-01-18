const {StockDAO} = require('./StocksDAO.js');

class StocksService {
    static async findStocks(id) {
        if (id !== undefined) {
            return await StockDAO.findById(id);
        }

        return await StockDAO.find();
    }

    static async addStock(stock) {
        return await StockDAO.insert(stock);
    }

    static async deleteStock(id) {
        return await StockDAO.delete(id);
    }
}

module.exports = {
    StocksService,
}