// backend/routes/admin/renderAll.js

const fs = require('fs');
const path = require('path');

function renderAllTeams(req, res) {
  const teamsPath = path.join(__dirname, '../../data/teams.json');

  fs.readFile(teamsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load team data' });
    }

    try {
      const teams = JSON.parse(data);
      res.status(200).json({ teams });
    } catch (parseErr) {
      res.status(400).json({ error: 'Invalid JSON format in team data' });
    }
  });
}

module.exports = { renderAllTeams };
