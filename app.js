const express = require("express");
const viewRouter = require("./routes/views.router");
const db = require("./config/dbConfig");
const app = express();
const port = 3000;

db.connectToMongoDB();

app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static("public")); // reading static files

// set the view engine to ejs
app.set("view engine", "ejs");

app.use("/views", viewRouter); // using views router

// User homepage or index route route
app.get("/", async (req, res) => {
  res.render("index.ejs", { user: res.locals.user || null });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    data: [],
  });
});

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
