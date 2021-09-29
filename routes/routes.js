const express = require('express');
const router = express.Router()
const { getAllLinks, addLink, deleteLink, getToLink } = require('../controllers/tasks')

router.route('/').get(getAllLinks).post(addLink)
router.route('/:id').delete(deleteLink).get(getToLink);

module.exports = router;