const {DogsService} = require('./DogsService');

class DogsController {
    static getAllDogs(req, res) {
        try {
            const dogs = DogsService.getDogs();
            res.status(200).json(dogs);
        } catch (err) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: err.message
            });
        }
    }

    static getDogById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const dog = DogsService.getDogs(id);
            res.status(200).json(dog);
        } catch (err) {
            res.status(404).json({
                status: 'Not Found',
                message: err.message
            });
        }
    }

    static createDog(req, res) {
        try {
            const dogData = req.body;
            const newDog = DogsService.addDog(dogData);
            res.status(201).json(newDog);
        } catch (err) {
            res.status(400).json({
                status: 'Bad Request',
                message: err.message
            });
        }
    }

    static deleteDog(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = DogsService.deleteDog(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({
                status: 'Not Found',
                message: err.message
            });
        }
    }
}

module.exports = {
    DogsController,
};