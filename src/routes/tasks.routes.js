const {Router} = require("express");

const tasksRouter = Router();

tasksRouter.post("/", (request, response) => {
    response.json({message: "Rota para criação de tarefas"});
}); // 1. Criar Tarefa

module.exports = tasksRouter;