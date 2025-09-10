const express = require('express');
const { sendLog } = require("../utils/log");

const router = express.Router();

// Easy test route
router.get('/test', async (req, res) => {
  try {
    let logResult = await sendLog("frontend", "info", "api", "Test request");
    res.status(200).json({
      ok: true,
      ...logResult // Add logID and message
    });
  } catch (error) {
    console.log('Route error:', error.message);
    res.status(500).json({
      ok: false,
      logID: '31ca9da6-a21a-4c66-88f9-a5c2f9492c9f',
      message: 'Log failed: ' + error.message
    });
  }
});

module.exports = router;