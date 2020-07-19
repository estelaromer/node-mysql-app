const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('../views/links/add');
})

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    try {
        await pool.query('INSERT INTO links set ?', [newLink]);
    } catch (error) {
        console.log(error);
    }
    res.send('Recibido');
})

module.exports = router;