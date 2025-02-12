const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all users
router.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new user
// router.post('/users', (req, res) => {
//   const { name, email } = req.body;
//   pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "User added successfully!", userId: results.insertId });
//   });
// });

router.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log("Fetched Users: ", results); // Add this line
        res.json(results);
    });
});

module.exports = router;
