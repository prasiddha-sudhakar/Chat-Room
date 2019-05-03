var app = require('http').createServer(response);
var fs = require('fs');
var io = require('socket.io')(app);
var cheerio = require("cheerio");
var express = require('express');
var router = express.Router();

// cheerio.load(fs.readFileSync('C:\Users\prasi\Desktop\ChatRoomPras\index.html'));

app.listen(3000);
console.log("App running...");

// console.log(index.getUserName());
// var username = document.title;
// alert(username);
//
// app.get('/index.js', function(req, res){
//   res.render('videos', {
//     title: 'Video Gallery'
//   });
// });

// fs.readFile('C:\Users\prasi\Desktop\ChatRoomPras\index.html', 'utf8', function(err, data) {
//     // if (err) throw err;
//     var $ = cheerio.load(data);
//     var title = $.title;
//     console.log($.html());
//     console.log(title);
// });

function response(req, res) {
    var file = "";
    if (req.url == "/") {
        file = __dirname + '/index.html';
    } else {
        file = __dirname + req.url;
    }

    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Page or file not found');
        }
    res.writeHead(200);
        res.end(data);
    });
}

io.on("connection", function(socket) {
    socket.on("send message", function(sent_msg, callback) {
        sent_msg = "  [" + getCurrentDate() + "]: " + sent_msg;
        io.sockets.emit("update messages", sent_msg);
        callback();
    });
});

function getCurrentDate() {
    var currentDate = new Date();
        // var $ = cheerio.load(body);
        // var title = $("title").text();
    var day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
    var month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
    var year = currentDate.getFullYear();
    var hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    var minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    var second = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
