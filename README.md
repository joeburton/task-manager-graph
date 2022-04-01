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
    listId
    title
    detail
    complete
    date
  }
}
```

### Get Todos

```
query GetTodos {
  getTodos {
    id
    listId
    title
    detail
    complete
    date
  }
}
```

### Add Todo with inline variables

```
mutation AddTodo {
  addTodo(
    title: "create id"
    listId: "tech"
    detail: "first detail first detail first detail"
    date: "2021-03-07"
    complete: true
  ) {
    id
    listId
    title
    detail
    complete
    date
  }
}
```

### Add Todo with payload

```
mutation AddTodo($listId: String, $title: String, $detail: String, $complete: Boolean, $date: Date) {
  addTodo(listId: $listId, title: $title, detail: $detail, complete: $complete, date: $date) {
    id
    listId
    title
    detail
    complete
    date
  }
}

// Payload
{
  "title": "Build AWS pipeline",
  "listId": "tech",
  "detail": "Build AWS pipeline",
  "complete": false,
  "date": 1645660800000
}
```

### Update Todo with inline variables

```
mutation UpdateTodo {
  updateTodo(id: "620e7406ae4bd45177b85391", title: "This2 is a new titl22e2") {
    id
    title
  }
}
```

### Update Todo with payload

```
mutation UpdateTodo($id: ID, $listId: String, $title: String, $detail: String, $complete: Boolean, $date: Date) {
  updateTodo(id: $id, listId: $listId, title: $title, detail: $detail, complete: $complete, date: $date) {
    id
    listId
    title
    detail
    complete
    date
  }
}

// Payload
{
  "id": "622b19beef69ae3c2c02a9c7",
  "listId": "general",
  "title": "Fix toilet pan",
  "detail": "not much",
  "complete": true,
  "date": 1645660800000
}
```

### Delete Todo

```
mutation DeleteTodo {
  deleteTodo(id:"620e73faae4bd45177b8538f")
}
```

### Delete Many

```
mutation DeleteBulk {
  deleteBulk(title: "the title")
}
```
