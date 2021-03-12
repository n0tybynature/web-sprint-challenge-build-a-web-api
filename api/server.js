const express = require('express');


const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();
server.use(express.json());


server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);
// Complete your server here!
// Do NOT `server.listen()` inside this file!




module.exports = server;
