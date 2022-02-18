var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
function listen(port) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        app.use(cors());
        dotenv.config();
        const dbConnectionString = process.env.mongodb || '';
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        yield server.start();
        server.applyMiddleware({ app });
        try {
            yield mongoose.connect(dbConnectionString);
            console.log(`Mongoose connected on port ${port}`);
        }
        catch (error) {
            console.log(error);
        }
        return new Promise((resolve, reject) => {
            httpServer.listen(port).once('listening', resolve).once('error', reject);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield listen(4000);
            console.log('🚀 Server is ready at http://localhost:4000/graphql');
        }
        catch (err) {
            console.error('💀 Error starting the node server', err);
        }
    });
}
void main();
