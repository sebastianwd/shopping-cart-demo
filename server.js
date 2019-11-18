var express = require("express");
var graphqlHTTP = require("express-graphql");

var bodyparser = require("body-parser");
var { buildSchema } = require("graphql");
var cors = require("cors");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
var db = require("./src/models/index");
var schema = require("./src/graphql/schema");
var root = require("./src/graphql/resolvers");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Construct a schema, using GraphQL schema language

app.use(
  "/graphql",
  cors(),
  bodyparser.json(),
  graphqlHTTP({
    schema: schema,
    context: {
      db
    },
    rootValue: root,
    graphiql: true
  })
);
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

db.sequelize
  .authenticate()
  .then(() => console.log("Db connected"))
  .catch(err => console.log("Error: " + err));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
});
