const express = require('express');
//const video = require('./video');
const videosRouter = express.Router()
const fs = require('fs');

// data handle
const video = JSON.parse(fs.readFileSync("videos.json"));
var helper = require(__dirname + '/video.js');
const info = {title: "Fræðslumyndbandaleigan",
            data: video,
            helper:helper};
 const infoErr = {title: "Not Found",
               data: null,
               helper:helper};


videosRouter.get('', async (req, res) => {
    try {
        res.render('index', info);
    } catch (err) {
        if(err.response) {
            res.render('index',infoErr)
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('index', infoErr)
            console.log(err.requiest)
        } else {
            res.render('index', infoErr)
            console.error('Error', err.message)
        }
    }
});


videosRouter.get('/video/:id', async (req, res) => {
    let videoID = req.params.id;
    console.log(videoID);
    try {
        var item = helper.filterById(video["videos"], videoID);
        console.log(item);
        res.render('video', {title: item.title,
        videoData: item,
        helper:helper});
    } catch (err) {
        const vidErr = {title: `Error: ${videoID} not found`,
                videoData: null,
                helper:helper}
        if(err.response) {
            res.render('video',vidErr);
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('video', vidErr)
            console.log(err.requiest)
        } else {
            res.render('video', vidErr)
            console.error('Error', err.message)
        }
    }
});


module.exports = videosRouter 