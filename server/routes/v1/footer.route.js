const express = require('express');
const router = express.Router();
const footerController = require('../../controllers/v1/footer.controller');

router.get('/', footerController.getFooter);
router.post('/', footerController.createFooter);
router.put('/', footerController.updateFooter);
router.delete('/:id', footerController.deleteFooter);

module.exports = router;