const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const isValidDateFormat = require("../utils/isValidDateFormat");

class TasksController {
    async create(request, response) {

        const {titulo, descricao, status, data_vencimento} = request.body;

        // Validações de entrada do usuário
        if(!titulo) throw new AppError("A Tarefa deve conter um Título");
        if(!status) throw new AppError("A Tarefa deve possuir um Status");
        if(!["pendente", "concluída", "realizando"].includes(status)) throw new AppError("Deve ser fornecido um Status Válido (pendente, concluída, realizando)");
        if(data_vencimento && !isValidDateFormat(data_vencimento)) throw new AppError("Deve ser fornecido uma data de vencimento válida!");


        await knex("tasks").insert({
            title: titulo,
            description: descricao,
            status,
            due_date: data_vencimento
        });

        // Respondendo com o codígo (created)
        response.status(201).json();
    }

    async show(request, response) {
        const {id} = request.params;

        const task = await knex("tasks").where({id}).first();
        if(!task) throw new AppError("Não foi encontrado nenhum tarefa com esse ID");

        response.json(task);
    }

    async delete(request, response) {
        const {id} = request.params;
        const task = await knex("tasks").where({id}).first();

        if(!task) throw new AppError("Não foi encontrado nenhum tarefa com esse ID");
        await knex("tasks").where({id}).delete();
    
        response.json();
    }
}

module.exports = TasksController;