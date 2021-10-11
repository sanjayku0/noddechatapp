const express = require('express')

const app = express(); 
// public stativ 
app.use(express.static('public'));
app.use('/css', express.static(__dirname +'/public/style.css')); 
app.use('/html', express.static(__dirname +'/public/index.html')); 
app.use('/img', express.static(__dirname +'/public/wassup.png')); 
app.use('script',express.static(__dirname +'/public/script.js'))
const http = require('http').createServer(app)
// socket .io
const io = require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('connected..')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

app.get('/',(req,res)=>{
    res.render("index")
})

const PORT = process.env.PORT ||3000

http.listen(PORT,()=> console.log("this server starr"))