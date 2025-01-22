# Task Manager Graph API

#Live

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://task-manager-graph.vercel.app/graphql' \
  --data '{"query":"{\n    getTasks {id, title, detail, complete, date}\n}","variables":{}}'
```

#Local

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'http://localhost:4000/graphql' \
  --data '{"query":"{\n    getTasks {id, title, detail, complete, date}\n}","variables":{}}'
```

### Get Task

```
query GetTask {
  getTask(id: "62262b1d221387163eacaba5") {
    id
    listName
    title
    detail
    complete
    date
  }
}
```

### Get Tasks

```
query GetTasks {
  getTasks {
    id
    listName
    title
    detail
    complete
    date
  }
}
```

### Add Task with inline variables

```
mutation AddTask {
  addTask(
    title: "create id"
    listName: "tech"
    detail: "first detail first detail first detail"
    date: "2021-03-07"
    complete: true
  ) {
    id
    listName
    title
    detail
    complete
    date
  }
}
```

### Add Task with payload

```
mutation AddTask($listName: String, $title: String, $detail: String, $complete: Boolean, $date: Date) {
  addTask(listName: $listName, title: $title, detail: $detail, complete: $complete, date: $date) {
    id
    listName
    title
    detail
    complete
    date
  }
}

// Payload
{
  "title": "Build AWS pipeline",
  "listName": "tech",
  "detail": "Build AWS pipeline",
  "complete": false,
  "date": 1645660800000
}
```

### Update Task with inline variables

```
mutation UpdateTask {
  updateTask(id: "620e7406ae4bd45177b85391", title: "This2 is a new titl22e2") {
    id
    title
  }
}
```

### Update Task with payload

```
mutation UpdateTask($id: ID, $listName: String, $title: String, $detail: String, $complete: Boolean, $date: Date) {
  updateTask(id: $id, listName: $listName, title: $title, detail: $detail, complete: $complete, date: $date) {
    id
    listName
    title
    detail
    complete
    date
  }
}

// Payload
{
  "id": "622b19beef69ae3c2c02a9c7",
  "listName": "general",
  "title": "Fix toilet pan",
  "detail": "not much",
  "complete": true,
  "date": 1645660800000
}
```

### Delete Task

```
mutation DeleteTask {
  deleteTask(id:"620e73faae4bd45177b8538f")
}
```

### Delete Many

```
mutation DeleteBulk {
  deleteBulk(title: "the title")
}
```
