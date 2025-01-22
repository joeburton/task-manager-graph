"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  scalar Date
  type Task {
    id: ID
    listName: String
    title: String
    detail: String
    complete: Boolean
    date: Date
  }
  type listName {
    listName: String
    id: ID
  }
  type Query {
    getListNames: [listName]
    getTasks: [Task]
    getTask(id: ID): Task
  }
  type Mutation {
    addListName(listName: String): listName
    deleteListName(id: ID): String
    addTask(
      listName: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Task
    deleteTask(id: ID): String
    deleteBulk(title: String): String
    updateTask(
      id: ID
      listName: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Task
  }
`;
exports.default = typeDefs;
