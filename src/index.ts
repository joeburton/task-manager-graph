import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

async function listen(port: number) {
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
  await server.start();

  server.applyMiddleware({ app });

  try {
    await mongoose.connect(dbConnectionString);
    console.log(`Mongoose connected on port ${port}`);
  } catch (error) {
    console.log(error);
  }

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject);
  });
}

async function main() {
  try {
    await listen(4000);
    console.log('🚀 Server is ready at http://localhost:4000/graphql');
  } catch (err) {
    console.error('💀 Error starting the node server', err);
  }
}

main();
