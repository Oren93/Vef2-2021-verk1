const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = 3000;

// set up static folders
app.use(express.static("public"));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/videos", express.static(`${__dirname}/public/videos`));

// set templating engine
app.use(expressLayout);
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Routes
const videosRouter = require("./src/routes/main");

app.use("/", videosRouter);
app.use("/video", videosRouter);

// set up error handling
const apiErrorHandler = require("./src/error/api-error-handler");

app.use(apiErrorHandler);
// is it needed???
app.use((req, res) => {
  res.status(404).render("error");
});
// Listen on port 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
