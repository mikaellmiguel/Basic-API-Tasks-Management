const {Router} = require("express");
const TasksController = require("../controllers/TasksController");

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.post("/", tasksController.create); // 1. Criar Tarefa
tasksRouter.get("/:id", tasksController.show); // 3. Buscar tarefa por ID
tasksRouter.delete("/:id", tasksController.delete); // 5. Excluir uma tarefa

module.exports = tasksRouter;