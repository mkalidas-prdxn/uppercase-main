const express = require('express');
var Busboy = require('busboy');
var fs = require('fs');
var {Transform} = require('stream');
const app = express();

app.get('/', function(req,res){
  res.sendFile(__dirname + '/home.html');
})

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

app.post('/fileupload', function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var fname = __dirname+"/hello.txt";
    var readStream = fs.createReadStream(fname);
    readStream.pipe(upperCase).pipe(res);
  });
  return req.pipe(busboy);    
});

app.listen(8080,function(req, res){
  console.log('server running');
})





