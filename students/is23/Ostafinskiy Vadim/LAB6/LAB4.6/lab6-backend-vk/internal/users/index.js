const express = require('express');
const {UsersController} = require('./UsersController');

const router = express.Router();

router.get('/', UsersController.getAllUsers);         
router.get('/vk', UsersController.getVKUsers);       
router.get('/custom', UsersController.getCustomUsers); 
router.get('/:id', UsersController.getUserById);      
router.post('/', UsersController.addUser);            
router.delete('/:id', UsersController.deleteUser);    

module.exports = router;