const {Router} = require("express");
const TasksController = require("../controllers/TasksController");

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.post("/", tasksController.create); // 1. Criar Tarefa
tasksRouter.get("/", (request, response) => {
    if(request.query.status){
        return tasksController.filterById(request, response); // 6. Filtar por status
    }

    return tasksController.index(request, response); // 2. Listar todas as tarefas
});
tasksRouter.get("/:id", tasksController.show); // 3. Buscar tarefa por ID
tasksRouter.put("/:id", tasksController.update); // 4. Atualizar a Tarefa
tasksRouter.delete("/:id", tasksController.delete); // 5. Excluir uma tarefa

module.exports = tasksRouter;