const express = require('express');
const router = express.Router();
const { analyzeDependencies } = require('../services/dependencyAnalysis');
const db = require('../src/db');

router.post('/analyze', async (req, res) => {
  try {
    const { projectPath } = req.body;
    const dependencies = analyzeDependencies(projectPath);

    // Store results in the database
    const query = 'INSERT INTO dependency_analysis (project_path, results) VALUES ($1, $2) RETURNING id';
    const values = [projectPath, JSON.stringify(dependencies)];
    const result = await db.query(query, values);

    res.json({ id: result.rows[0].id, dependencies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analysis/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM dependency_analysis WHERE id = $1';
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;