const express = require("express");
const inventoryController = require("../controllers/inventory");
const router = express.Router();

router.get("/:id", inventoryController.get);
router.get("/", inventoryController.getAll);
router.post("/create", inventoryController.create);
router.patch("/:id", inventoryController.update);
router.delete("/:id", inventoryController.delete);

router.post("/approve/:id", inventoryController.approveInventory);
router.post("/reject/:id", inventoryController.rejectInventory);
router.get("/approve/:check", inventoryController.getAllApproved);
router.get("/reject/:check", inventoryController.getAllRejected);

module.exports = router;
