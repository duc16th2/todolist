const router = require("express").Router();
const todoController = require("./../controller/todo.controller");
router.get("", todoController.todos);
router.post("", todoController.addItem);
router.get("/done/:_id", todoController.doneItem);
router.get("/delete/:_id", todoController.removeItem);
module.exports = router;
