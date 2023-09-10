const express = require("express");
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { prismaClient } from "../client/db";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.get("/", (req: any, res: any) => {
    res.status(200).json("Hello Aditya Gupta");
  });
  const graphqlServer = new ApolloServer({
    typeDefs: `
    type Query{
      sayHello:String
      greet(name:String!):String!
    }
    
    `,
    resolvers: {
      Query: {
        sayHello: () => `Hello From Graphql Server`,
        greet: (parent, { name }: { name: string }) =>
          `Hey ${name} how are you`,
      },
    },
  });
  await graphqlServer.start();
  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
