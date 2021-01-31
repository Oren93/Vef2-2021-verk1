const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const reqPath = path.join(__dirname, '../');
// set up a static folder 
app.use(express.static('styles'));
app.use(express.static('public'));
//app.use('/css',express.static(reqPath + 'styles/'));

//app.use(express.static(path.join(__dirname,'../')));

// set templating engine
app.use(expressLayout);
app.set('view engine', 'ejs');

app.get('',(req,res)=>{
    res.render('index',{title: "Fræðslumyndbandaleigan"});
});

app.get('/video',(req,res)=>{
    res.render('video',{title:"video"});
});


app.listen(PORT, ()=>{console.log('Server started on port '+PORT)});