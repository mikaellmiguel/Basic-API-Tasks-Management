require("express-async-errors");
require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");

const app = express();
app.use(express.json());

app.use(routes); // Utilizando as rotas criadas

// Tratativa de Erros
app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            type: "Error",
            message: error.message
        });
    }

    // Internal Server Error
    console.error(error);

    return response.status(500).json({
        type: "Error",
        message: "Internal Server Error"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});