// backend/routes/admin/uploadTeam.js

const csv = require('csv-parser');
const fs = require('fs');

const expectedHeaders = [
  'team_id',
  'team_name',
  'sport',
  'season',
  'coach_name',
  'school_name',
  'region',
  'division',
  'contact_email'
];

// Read-only: schema reference only
module.exports = { expectedHeaders };
