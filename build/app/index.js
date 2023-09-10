"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express = require("express");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        app.use(body_parser_1.default.json());
        app.get("/", (req, res) => {
            res.json("Hello Aditya Gupta");
        });
        const graphqlServer = new server_1.ApolloServer({
            typeDefs: `
    type Query{
      sayHello:String
      greet(name:String!):String!
    }
    
    `,
            resolvers: {
                Query: {
                    sayHello: () => `Hello From Graphql Server`,
                    greet: (parent, { name }) => `Hey ${name} how are you`,
                },
            },
        });
        yield graphqlServer.start();
        app.use("/graphql", (0, express4_1.expressMiddleware)(graphqlServer));
        return app;
    });
}
exports.initServer = initServer;
