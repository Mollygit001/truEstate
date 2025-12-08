const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.route('/')
    .get(salesController.getSales);

router.route('/filters')
    .get(salesController.getFilterOptions);

module.exports = router;
