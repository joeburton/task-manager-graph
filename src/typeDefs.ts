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
  type ListId {
    listId: String
    id: ID
  }
  type Query {
    getListIds: [ListId]
    getTodos: [Todo]
    getTodo(id: ID): Todo
  }
  type Mutation {
    addListId(listId: String): ListId
    deleteListId(id: ID): String
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
