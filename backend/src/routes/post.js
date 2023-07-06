const express = require("express")
const postController = require('../controllers/post')
const router = express.Router()



router.get("/:id", postController.get)
router.get("/", postController.getAll)
router.post('/create', postController.create)
router.patch("/:id", postController.update)
router.delete("/:id", postController.delete)

router.post('/approve/:id', postController.approvePost)
router.post('/reject/:id', postController.rejectPost)

module.exports = router