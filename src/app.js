const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/game', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'game.html'))
})

app.listen(PORT, function(){
    console.log('server started on port 3000')
})