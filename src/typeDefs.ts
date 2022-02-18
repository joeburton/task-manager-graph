import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  type Todo {
    id: ID
    title: String
    detail: String
    date: Date
  }
  type Query {
    getTodos: [Todo]
    getTodo(id: ID): Todo
  }
  type Mutation {
    addTodo(title: String, detail: String, date: Date): Todo
  }
`;
export default typeDefs;
