const express = require('express');
const server = express();
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())


server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)
server.get('/', (req, res) => {
    res.send('TESTING TESTING');
})

module.exports = server;
