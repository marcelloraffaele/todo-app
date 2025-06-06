# todo-app
The classic To-Do application where a user can write down all the things he wants to accomplish.

## Demo

### Prompt 1
Using **Claude Sonnet 3.5**,

```
Create a Spring boot controller expose and API for a TODO application.
Create a `beans` folder and add a `Todo` class with the following fields: id, Description, creationDate, expirationDate, category, state[done, active, canceled]
Create a `services` folder and add a `TodoService` that will manage a Map<Long,Todo> an a Long as currentMaxId.
Create a `controllers` folder and add a `TodoController` that implements the REST service with the following methods:
- GET /todos : get all todo from service
- POST /todos: add a new todo
- GET /todos/<id> : get the todo with the id
- PUT /todos/<id>: modify the todo.
Generate swagger dependency classes in order to get the documentation of this API.
Create Test classes for the service and the controller. Execute the tests and if there are errors, fix them.
```

### Prompt2
```
Generate the following curl: 
    1. curl for get all todos 
    2. Curl for create new todo
    3. Curl for modify one existing todo.
    4. Get the open api definition
create in a `client.rest` file
```


### Prompt 3
exec the backend and get the swagger definition and save it in a file `api-definition.json`.

```
curl -X GET "http://localhost:8080/v3/api-docs" -H "accept: application/json" -o api-definition.json
```

### Prompt 4
Follow the instructions below:
1. Extract the swagger definition and save it in a file `api-definition.json`.
2. Using **GiHub Copilot Agent Mode**, select the **Claude 3.7** model and add as attachment the file `api-definition.json`, add the `frontend` folder and call the agent with the following prompt:
```
Create a react application in the folder `todo-frontend` that manages todos using that API.
The graphical aspect must be colored and must use Tailwind.
Split the implementation into components and put the REST client in a folder named `services`.
Tailwind is already configured, don't configure it. Be sure to update the the libraries and run the application, if any errorers occur, fix them.
```


## Additional features that can be added to the project
### User Stories

-   [ ] User can see an `input` field where he can type in a to-do item
-   [ ] By pressing enter (or a button), the User can submit the to-do item and can see that being added to a list of to-do's
-   [ ] User can mark a to-do as `completed`
-   [ ] User can remove a to-do item by pressing on a button (or on the to-do item itself)

### Bonus features

-   [ ] User can edit a to-do
-   [ ] User can see a list with all the completed to-do's
-   [ ] User can see a list with all the active to-do's
-   [ ] User can see the date when he created the to-do
-   [ ] When closing the browser window the to-do's will be stored and when the User returns, the data will be retrieved

## Basic setup for the project
```bash
# Backend
# goto springboot initializr and create a springboot project

# frontend
## create the react app with vite
npm create vite@latest todo-frontend --template react
## setup the project with tailwindcss
npm install tailwindcss @tailwindcss/vite
### follow this instructions https://tailwindcss.com/docs/installation/using-vite
```
