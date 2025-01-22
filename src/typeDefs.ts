import { gql } from "apollo-server-express";

const typeDefs = gql`
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

export default typeDefs;
