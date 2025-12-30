const express = require('express');
const { UsersController } = require('./UsersController');

const router = express.Router();

router.get('/', UsersController.getUsers);
router.get('/:id', UsersController.getUserById);
router.post('/', UsersController.createUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;