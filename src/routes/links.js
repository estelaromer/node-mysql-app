const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('../views/links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    try {
        await pool.query('INSERT INTO links set ?', [newLink]);
        req.flash('success', 'Link saved successfully');
        res.redirect('/links');
    } catch (error) {
        console.log(error);
    }
});

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
        res.render('links/list', { links })
    } catch (error) {
        console.log(error);
    }
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM links WHERE ID = ?', [id]);
        req.flash('success', 'Link deleted successfully.');
    } catch (error) {
        console.log(error);
    }
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try {
        const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
        res.render('links/edit', { link: links[0] });
    } catch (error) {
        console.log(error);
    }
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    try {
        await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
        req.flash('success', 'Link edited successfully.');
    } catch (error) {
        console.log(error);
    }
    res.redirect('/links');
});

module.exports = router;