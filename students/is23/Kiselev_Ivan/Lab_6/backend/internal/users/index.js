const express = require('express');
const { UserController } = require('./UserController');

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;