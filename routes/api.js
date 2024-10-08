const express = require('express');
const router = express.Router();
const { analyzeCode } = require('../services/dependencyAnalysis');
const db = require('../src/db');

router.post('/analyze', async (req, res) => {
    try {
        const { code } = req.body;
        const dependencies = analyzeCode(code);

        // Store results in the database
        const query = 'INSERT INTO dependency_analysis (code_snippet, results) VALUES ($1, $2) RETURNING id';
        const values = [code, JSON.stringify(dependencies)];
        const result = await db.query(query, values);

        res.json({ id: result.rows[0].id, dependencies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ... keep the GET /analysis/:id route as is

module.exports = router;