const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Recipe = require("./models/Recipe");
const User = require("./models/User");

// Bring in GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Connects to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

// Initializes application
const app = express();

app.use(cors("*"));

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Create GraphiQL application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Connect schemas with GraphQL
app.use(
  "/graphql",
  bodyParser.json({ limit: "100mb" }),
  bodyParser.urlencoded({ extended: true, limit: "100mb" }),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  }))
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.set('port', process.env.PORT || 4444);

const server = app.listen(app.get('port'), () => {
  console.log(`Server running → PORT ${server.address().port}`);
});


