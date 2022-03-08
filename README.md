# apollo-3-mongoose-integration

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://apollo-3-mongoose-integration.vercel.app/graphql' \
  --data '{"query":"{\n    getTodos {id, title, detail, complete, date}\n}","variables":{}}'
```

### Get Todo

```
query GetTodo {
  getTodo(id: "62262b1d221387163eacaba5") {
    id
    title
    detail
    complete
  }
}
```

### Get Todos

```
query GetTodos {
  getTodos {
    id
    title
    detail
    complete
    date
  }
}
```

### Add Todos

```
mutation AddTodo {
  addTodo(
    title: "another 2"
    detail: "first detail first detail first detail"
    date: "2022-03-07"
    complete: false
  ) {
    id
    title
    detail
    complete
    date
  }
}
```

### Delete Todo

```
mutation DeleteTodo {
  deleteTodo(id:"620e73faae4bd45177b8538f")
}
```

### Update Todo

```
mutation UpdateTodo {
  updateTodo(id: "620e7406ae4bd45177b85391", title: "This2 is a new titl22e2") {
    id
    title
  }
}
```

### Delete Many

```
mutation DeleteBulk {
  deleteBulk(title: "the title")
}
```
