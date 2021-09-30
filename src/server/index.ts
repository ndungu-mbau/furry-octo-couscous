require("dotenv").config();
require("reflect-metadata");
import express from "express";
import cors from "cors"
import { graphqlHTTP } from "express-graphql";
import application, { schema } from "../apps";
import { router as authRouter, tokenMiddleware } from "../auth";

const execute = application.createExecution();
const server: express.Application = express();

server.use(cors())

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", authRouter);

server.use("/api/graph", async (req, res) => {
  return graphqlHTTP({
    schema,
    customExecuteFn: execute,
    context: {
      // user: res.locals.user,
    },
    graphiql: true,
  })(req, res)
});

export {
  server
}
