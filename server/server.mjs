import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import "dotenv/config";
import "./firebaseConfig.js";
const app = express();
const httpServer = http.createServer(app);

//connect to database
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k5l4pvo.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

//resolvers
//schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

//chan tat ca reqest tu client gui toi, can verify accesstoken trong header no co hop le khong thi moi cho xu ly tiep cac middleware khac
const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.headers.authorization });
  next();
};
app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server));

//ket noi toi database
mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("conected to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(" Server ready at http://localhost:4000");
  });
