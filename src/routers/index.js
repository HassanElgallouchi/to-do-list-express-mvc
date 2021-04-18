const express = require("express");
const router = express.Router();

const tacheController = require("../controllers/tacheController");

router.get("/", tacheController.getAll);
router.get("/tache/:id", tacheController.getOne);

router.get("/delete/:id", tacheController.delete);

router.post("/post", tacheController.addOne);
router.get("/post", (req, res) => res.redirect("/"));

router.get("/edit/:id", tacheController.editOne);
router.post("/edit/:id", tacheController.editTask);

router.get("/liste", tacheController.getAllList);
router.get("/liste/:liste", tacheController.getOneList);

module.exports = router;