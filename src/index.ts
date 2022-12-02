import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

async function listen(port: number) {
  const DB_CONNECTION_STRING = process.env.MONGODB || '';

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  server.applyMiddleware({ app });

  try {
    await mongoose.connect(DB_CONNECTION_STRING);
  } catch (error) {
    console.log(`Error: `, error);
  }

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject);
  });
}

async function startApolloServer() {
  try {
    await listen(4000);
    console.log('🚀 Server is ready at http://localhost:4000/graphql');
  } catch (err) {
    console.error('💀 Error starting the node server', err);
  }
}

startApolloServer();

// Export the http server so that Vercel can start it:
export default httpServer;
