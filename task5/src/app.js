const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const clientRoutes = require('./routes/client.route');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/design/views'));
hbs.registerPartials(path.join(__dirname, '/design/layouts'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded());

app.use(clientRoutes);

module.exports =app;