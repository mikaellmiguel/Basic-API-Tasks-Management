const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(routes) // Utilizando as rotas criadas

const PORT = 3000;

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is Running on Port ${PORT}`);
});