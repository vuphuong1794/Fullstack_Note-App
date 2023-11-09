import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import { getAuth } from "firebase-admin/auth";
import "dotenv/config";
import "./firebaseConfig.js";

const app = express();
const httpServer = http.createServer(app);

//connect to database
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k5l4pvo.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});

const serverCleanup = useServer({ schema }, wsServer);
//resolvers
//schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

//chan tat ca reqest tu client gui toi, can verify accesstoken trong header no co hop le khong thi moi cho xu ly tiep cac middleware khac
const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.headers.authorization });
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];

    //kiem tra token hop le khong
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log({ decodedToken });
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        console.log({ err });
        //khong co quyen truy xuat den api
        return res.status(403).json({ message: "Forbidden", error: err });
      });
  } else {
    next();
    //return res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);

//ket noi toi database
mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("conected to DB");
    //chỉ cần start httpServer thì có thể start graphqlServer và websocketServer
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(" Server ready at http://localhost:4000");
  });
