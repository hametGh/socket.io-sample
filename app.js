const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const app = express()
const port = 5000


const server = http.createServer(app)
const io = socketIO(server)




io.on('connection', (socket) => {

    socket.on('newMessage', (msg) => {
        socket.broadcast.emit('newMessageRecieved', {
            message: msg.message,
            userId: socket.id
        });
    })

})


// our app's route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/htmls/chat.html')
})


server.listen(port, () => console.log(`listening on port ${port}`))
