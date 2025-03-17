create a Spring boot controller expose and API for a TODO application.
Create a `beans` folder and add a `Todo` class with the following fields: id, Description, creationDate, expirationDate, category, state[done, active, canceled]
Create a `services` folder and add a `TodoService` that will manage a Map<Long,Todo> an a Long as currentMaxId.
Create a `controllers` folder and add a `TodoController` that implements the REST service with the following methods:
- GET /todos : get all todo from service
- POST /todos: add a new todo
- GET /todos/<id> : get the todo with the id
- PUT /todos/<id>: modify the todo.
Generate swagger dependency classes in order to get the documentation of this API.