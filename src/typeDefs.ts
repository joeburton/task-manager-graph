import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  type Todo {
    id: ID
    listId: String
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
    addTodo(
      listId: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Todo
    deleteTodo(id: ID): String
    deleteBulk(title: String): String
    updateTodo(
      id: ID
      listId: String
      title: String
      detail: String
      complete: Boolean
      date: Date
    ): Todo
  }
`;

export default typeDefs;
