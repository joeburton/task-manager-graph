"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  scalar Date
  type Todo {
    id: ID
    title: String
    detail: String
    complete: Boolean
    date: Date
  }
  type Query {
    getTodos: [Todo]
    getTodo(id: ID): Todo
  }
  type Mutation {
    addTodo(title: String, detail: String, complete: Boolean, date: Date): Todo
    deleteTodo(id: ID): String
    deleteBulk(title: String): String
    updateTodo(
      id: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Todo
  }
`;
exports.default = typeDefs;
