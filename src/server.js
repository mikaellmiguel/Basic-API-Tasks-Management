const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is Running on Port ${PORT}`);
});