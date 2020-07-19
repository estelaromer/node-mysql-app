const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('../views/links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    try {
        await pool.query('INSERT INTO links set ?', [newLink]);
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const links = await pool.query('SELECT * FROM links');
        res.render('links/list', { links })
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    } catch (error) {
        console.log(error);
    }
    res.redirect('/links');
});

module.exports = router;