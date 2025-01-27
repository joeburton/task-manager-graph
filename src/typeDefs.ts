import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  type ListName {
    id: ID!
    uid: String
    listName: String
  }
  type Task {
    id: ID!
    uid: String
    listName: String
    title: String
    detail: String
    complete: Boolean
    date: Date
  }
  type Query {
    getListNames(uid: String!): [ListName]
    getTasks(uid: String!): [Task]
    getTask(id: ID!): Task
  }
  type Mutation {
    addListName(listName: String!, uid: String!): ListName
    deleteListName(id: ID!): String
    addTask(
      uid: String!
      listName: String!
      title: String!
      detail: String
      complete: Boolean!
      date: Date!
    ): Task
    deleteTask(id: ID!): String
    deleteBulk(title: String!): String
    updateTask(
      id: ID!
      uid: String
      listName: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Task
  }
`;

export default typeDefs;
