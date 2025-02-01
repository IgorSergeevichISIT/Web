const { StocksService } = require('./StocksService');

class StocksController {
    static findStocks(req, res) {
        try {
            res.send(StocksService.findStocks());
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).send({ status: 'Bad Request', message: 'Invalid ID' });
            }
            res.send(StocksService.findStocks(id));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static addStock(req, res) {
        try {
            const newStock = req.body;
            if (!newStock.id || !newStock.src || !newStock.title || !newStock.text) {
                return res.status(400).send({ status: 'Bad Request', message: 'Invalid stock data' });
            }
            res.send(StocksService.addStock(newStock));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }

    static deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).send({ status: 'Bad Request', message: 'Invalid ID' });
            }
            res.send(StocksService.deleteStock(id));
        } catch (err) {
            res.status(400).send({ status: 'Bad Request', message: err.message });
        }
    }
}

module.exports = { StocksController };
