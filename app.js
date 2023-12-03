const app = require("./api");
const db = require("./config/dbConfig");
const port = 3000;

db.connectToMongoDB();

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
