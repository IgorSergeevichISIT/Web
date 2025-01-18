const {StocksService} = require('./StocksService.js');

class StocksController {
    static async findStocks(req, res) {
        try {
            res.send(await StocksService.findStocks());
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static async findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(await StocksService.findStocks(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static async addStock(req, res) {
        try {
            res.send(await StocksService.addStock(req.body));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static async deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(await StocksService.deleteStock(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

module.exports = {
    StocksController,
};