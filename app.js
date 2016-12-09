const http = require('http');
const sockjs = require('sockjs');
const bodyParser = require('body-parser');
const express = require('express');
const app =express();

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all('*',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

let num = 0;
let result = [1,2,3,4,5,6,7,8,9,10];
let sock = sockjs.createServer();
sock.on('connection',conn=>{
    conn.on('data',msg=>{
        // conn.write(msg);
        console.log(msg);
    });
    conn.on('close',()=>{
        console.log('disconnect!');
    });
    conn.on('error',(e)=>{
        console.log(e);
    });
    setInterval(()=>{
        console.log(randomData(result));
        conn.write(randomData(result));
    },1000);
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app).listen(PORT, ()=>{
    console.log('express server port: ' + PORT);
});
sock.installHandlers(server,{prefix: '/echo'});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/src/views/index.html');
});

function randomData(data){
    for(let i=0;i<data.length;i++){
        data[i] = Math.floor(Math.random()*10);
    }
    return data;
}

