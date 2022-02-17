const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const { cookie } = require('express/lib/response')
const io = socketio(server)
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    console.log("New connection")
    socket.on('username', uname => {
        socket.emit('message', `welcome! to the chat ${uname}`)
        socket.broadcast.emit('message', `${uname} joined the chat.`)
    })

    socket.on('chatmsgobj', msg => {
        socket.broadcast.emit('chatmesg', msg)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `Someone left the chat.`)
    })
})
const PORT = 3000 || process.env.PORT


server.listen(PORT, () => console.log(`Server running on ${PORT}...`))