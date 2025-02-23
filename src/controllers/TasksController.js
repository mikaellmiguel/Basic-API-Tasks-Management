const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const isValidDateFormat = require("../utils/isValidDateFormat");

class TasksController {
    async create(request, response) {

        const {titulo, descricao, status, prioridade, data_vencimento} = request.body;

        // Validações de entrada do usuário
        if(!titulo) throw new AppError("A Tarefa deve conter um Título");
        if(!status) throw new AppError("A Tarefa deve possuir um Status");
        if(!["pendente", "concluída", "realizando"].includes(status)) throw new AppError("Deve ser fornecido um Status Válido (pendente, concluída, realizando)");
        if(data_vencimento && !isValidDateFormat(data_vencimento)) throw new AppError("Deve ser fornecido uma data de vencimento válida!");
        if(!["alta", "média", "baixa"].includes(prioridade)) throw new AppError("Deve ser fornecido uma prioridade válida (alta, média, baixa)");

        await knex("tasks").insert({
            title: titulo,
            description: descricao,
            status,
            priority: prioridade,
            due_date: data_vencimento
        });

        // Respondendo com o codígo (created)
        response.status(201).json();
    }

    async index(request, response) {
        const tasks = await knex("tasks").select();
        response.json(tasks)
    }

    async show(request, response) {
        const {id} = request.params;

        const task = await knex("tasks").where({id}).first();
        if(!task) throw new AppError("Não foi encontrado nenhum tarefa com esse ID");

        response.json(task);
    }

    async update(request, response) {
        const {id} = request.params;
        const {titulo, descricao, status, prioridade, data_vencimento} = request.body;

        const task = await knex("tasks").where({id}).first();
        if(!task) throw new AppError("Não foi encontrado nenhum tarefa com esse ID");

        // Validações de entrada do usuário
        if(status && !["pendente", "concluída", "realizando"].includes(status)) throw new AppError("Deve ser fornecido um Status Válido (pendente, concluída, realizando)");
        if(data_vencimento && !isValidDateFormat(data_vencimento)) throw new AppError("Deve ser fornecido uma data de vencimento válida!");

        
        // Atualizando apenas as informações enviadas na requisição
        task.title = titulo || task.title;
        task.description = descricao || task.description;
        task.status = status || task.status;
        task.due_date = data_vencimento || task.due_date;
        task.priority = prioridade || task.priority;

        await knex("tasks").where({id}).update(task);

        response.json();
    }

    async delete(request, response) {
        const {id} = request.params;
        const task = await knex("tasks").where({id}).first();

        if(!task) throw new AppError("Não foi encontrado nenhum tarefa com esse ID");
        await knex("tasks").where({id}).delete();
    
        response.json();
    }

    async filterById(request, response) {
        let {status} = request.query;

        if(status == "concluida") status = "concluída"; // Ajusta o valor de "status" para garantir que "concluida" seja tratado como "concluída" (com acento),
        if(!["pendente", "concluída", "realizando"].includes(status)) throw new AppError("Deve ser fornecido um Status Válido (pendente, concluida, realizando)");

        const tasks = await knex("tasks").where({status});
        response.json(tasks);
    }

}

module.exports = TasksController;