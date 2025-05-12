const express = require("express");
const viewRouter = require("./routes/views.router");

const app = express();

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

// Catch-all route for undefined routes
app.get("*", (req, res) => {
  res.status(404).render("error.ejs", { error: "Page not found" });
});

app.use((error, res) => {
  console.error(error.stack); // log the error
  res.render("error.ejs", { error: error.message });
});

module.exports = app;
