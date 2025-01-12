const express = require('express');
const { StocksService } = require('../internal/stocks/StocksService');

const router = express.Router();


router.post('/members', async (req, res) => {
    try {
        const members = await StocksService.findMembers(); 
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/chats', async (req, res) => {
    try {
        const chats = await StocksService.findChats(); 
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/user/:id', async (req, res) => {
    try {
        const userInfo = await StocksService.getUserInfo(req.params.id);
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;