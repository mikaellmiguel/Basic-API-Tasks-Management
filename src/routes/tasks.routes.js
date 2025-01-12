const {Router} = require("express");
const TasksController = require("../controllers/TasksController");

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.post("/", tasksController.create); // 1. Criar Tarefa

module.exports = tasksRouter;