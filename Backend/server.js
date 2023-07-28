const express = require("express");

const app = express();

const http = require("http");
const cors = require("cors");

const {Server} = require("socket.io");// I bring the server class
const port = 3020;
app.use(cors());



const server = http.createServer(app);


// I am not able to understand what is the use of the options -- 
const io = new Server(server,{
    cors:{
        origin: "*",
    },
});



io.on("connection",(socket)=>{
    let payload;
    // console.log("connection Id => ",socket.id);
    // console.log("connection's name => ",socket.handshake.headers.connection);
    // console.log("connection's address => ",socket.handshake.address);
    // console.log("connection's origin => ",socket.handshake.headers.origin);


    socket.on("chat",(data)=>{
        payload = data;
        console.log("this is name 🥇 => ",data.nam);
        console.log("this is message=> ",data.message);
        io.emit("chat", payload);
    })
    
})

server.listen(port,()=>{
    console.log(`Server is connected on +${port}👍`)
})





