const http = require('http');
const EventEmitter = require('events');

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log("There was a new sale ..");
});
myEmitter.on('newSale', () => {
    console.log("Costumer name : DotCipher ..");
});
myEmitter.on('newSale', (stock) => {
    console.log(`There are now ${stock} items left in stock ..`);
});

myEmitter.emit('newSale', 100);

const server = http.createServer();

server.on('request', (req, res) => {
    console.log("Request 1 Received ..");
    res.end('request 1 received ..');
});
server.on('request', (req, res) => {
    console.log("Request 2 Received ..");
    // res.end('request 2 received ..');
});
server.on('close', (req, res) => {
    console.log("Server closed ..");
})


server.listen(1001, 'localhost', () => {
    console.log("listening on 1001 ..");
})