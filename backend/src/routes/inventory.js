const express = require("express")
const inventoryController = require('../controllers/inventory')
const router = express.Router()

router.get("/:id", inventoryController.get)
router.get("/", inventoryController.getAll)
router.post("/create", inventoryController.create)
router.patch("/:id", inventoryController.update)
router.delete("/:id", inventoryController.delete)

module.exports = router