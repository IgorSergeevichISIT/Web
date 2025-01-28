const express = require('express');
const {DogsController} = require('./DogsController');

const router = express.Router();

router.get('/', DogsController.findDogs);
router.get('/:id', DogsController.findDogById);
router.post('/', DogsController.addDog);
router.delete('/:id', DogsController.deleteDog);

module.exports = router;