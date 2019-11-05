const http = require('http');
const express = require('express');

const app = express();

const port = process.env.PORT || 4001;
const server = http.createServer(app);

server.listen(port, () => console.log('listening at port: ' + port));
