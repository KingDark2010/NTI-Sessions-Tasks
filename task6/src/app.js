const express = require('express');
require ('../app/db/dbConnection')
const Router = require('../app/routes/task.route');
const app = express();

app.use(express.json());
app.use(Router);




module.exports = app;