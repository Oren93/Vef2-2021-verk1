const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 3000;
const fs = require('fs');
//var helper = require(__dirname + '/src/routes/video.js');

// set up a static folders 
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/videos', express.static(__dirname + '/public/videos'));
//app.use('/js', express.static(__dirname + '/src/routes/js'));

// set templating engine
app.use(expressLayout);
app.set('views', './src/views');
app.set('view engine', 'ejs');

// data handle
//const video = JSON.parse(fs.readFileSync("videos.json"));

// Routes 
const videosRouter = require('./src/routes/main');

app.use('/', videosRouter)
app.use('/video', videosRouter)
/*
app.get('',(req,res)=>{
    res.render('index',{title: "Fræðslumyndbandaleigan",
                         data: video,
                         helper:helper});
});

app.get('/video',(req,res)=>{
    res.render('video',{data: video});
});*/
// Listen on port 3000
app.listen(PORT, ()=>{console.log('Server started on port '+PORT)});