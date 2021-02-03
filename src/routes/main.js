/* eslint-disable import/no-dynamic-require */
const express = require("express");

const videosRouter = express.Router();
const fs = require("fs");

// data handle
const video = JSON.parse(fs.readFileSync("videos.json"));
const helper = require(`${__dirname}/video.js`);

const info = {
  title: "Fræðslumyndbandaleigan",
  data: video,
  helper,
};
const infoErr = {
  title: "Not Found",
  data: null,
  helper,
};

videosRouter.get("", async (req, res) => {
  try {
    res.render("index", info);
  } catch (err) {
    res.status(404);
    res.render("index", infoErr);
    // eslint-disable-next-line no-console
    console.error("Error", err.message);
  }
});

/* eslint-disable  no-console */
videosRouter.get("/video/:id", async (req, res) => {
  const videoID = req.params.id;
  try {
    const item = helper.filterById(video.videos, videoID);
    res.render("video", {
      title: item.title,
      videoData: item,
    });
  } catch (err) {
    const vidErr = {
      title: `Error: ${videoID} not found`,
      videoData: null,
    };
    if (err.response) {
      res.status(404);
      res.render("video", vidErr);
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.status(404);
      res.render("video", vidErr);
      console.log(err.requiest);
    } else {
      res.status(404);
      res.render("video", vidErr);
      console.error("Error", err.message);
    }
  }
});
/* eslint-enable  no-console */

// handles all kind of wrong addresses after slash at localhost:3000/foo
videosRouter.get("/:drasl*", async (req, res) => {
  const { drasl } = req.params;
  res.status(404);
  res.render("video", {
    title: `Error: ${drasl} not exist`,
    videoData: null,
  });
});

module.exports = videosRouter;
