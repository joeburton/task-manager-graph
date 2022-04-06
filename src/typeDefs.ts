import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  type Todo {
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
    getTodos: [Todo]
    getTodo(id: ID): Todo
  }
  type Mutation {
    addListName(listName: String): listName
    deleteListName(id: ID): String
    addTodo(
      listName: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Todo
    deleteTodo(id: ID): String
    deleteBulk(title: String): String
    updateTodo(
      id: ID
      listName: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Todo
  }
`;

export default typeDefs;
