const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.set("strictQuery", false);

//import typedefs and resolvers
const TypeDefs = require("./schema");
const Resolvers = require("./resolvers");

//import ApolloServer
const { ApolloServer } = require("apollo-server-express");

const dotenv = require("dotenv");
dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
mongoose
    .connect(mongodb_atlas_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((success) => {
        console.log("Success Mongodb connection");
    })
    .catch((err) => {
        console.log("Error Mongodb connection");
    });

//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use("*", cors());

// Defining Apollo Server

let server = null;
async function startServer() {
    server = new ApolloServer({
        typeDefs: TypeDefs.typeDefs,
        resolvers: Resolvers.resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
}
startServer();

app.listen({ port: process.env.PORT }, () =>
    console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
);