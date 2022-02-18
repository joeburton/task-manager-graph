# apollo-3-mongoose-integration

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://apollo-3-mongoose-integration-logf2i0a5-joeburton.vercel.app/graphql' \
  --data '{"query":"{\n    getTodos {id, title, detail, date}\n}","variables":{}}'
```

### Get Todos

```
query GetTodos {
  getTodos {
    id
    title
    detail
    date
  }
}

```

### Get Todo

```
query GetTodo {
  getTodo(id: "620f98b37032aa7e334bab17") {
    title
    detail
  }
}

### Add Todos

```

```
mutation AddTodo {
  addTodo(
    title: "first todo"
    detail: "first detail first detail first detail"
    date: "2021-9-10"
  ) {
    id
    title
    detail
    date
  }
}
```

```

```
