# MERN-STACK

### MERN Stack is a full stack JavaScript framework for building web applications and mobile applications.

**MERN** stands for **M**ongoDB, **E**xpress, **R**eact, and **N**ode.js. It is a JavaScript stack that is used to build web applications and mobile applications.

###### Here our backend will have decoupled ends, in other workds our backend will be an API.

**REST API** stands for **RE**presentational **S**tate **T**ransfer **A**pplication **P**rogramming **I**nterface. It is an architectural style for designing networked applications. It is a set of constraints that developers follow when they create their web services.

**REST HTTP Methods**

- GET - Retrieve data from a specified resource.
- POST - Submit data to be to create or append a resource.
- Put - create or overwrite an existing resource.
- Patch - Update part of an existing resource.
- Delete - Delete a specified resource.
- Options - Retrieve the supported HTTP methods for a specified resource.

**GraphQL** is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

**Anatomy of a graphQL query**

```javascript
operation type-->   query {
operation 'endpoint' -->     allUsers {
                             ->id
  Requested fields---->      ->name
                             ->email
                            }
                        }
```

---

## Simple Demo App:

> server.js

```js
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/products", (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post("/product", (req, res, next) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid title and price.",
    });
  }

  const createdProduct = {
    id: uuid(),
    title,
    price,
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: "Created new product.", product: createdProduct });
});

app.listen(5000); // start Node + Express server on port 5000
```

## Resources:

- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Node Docs](https://nodejs.org/en/docs/)
- [Express Docs](https://expressjs.com/en/4x/api.html)
- [MongoDB Docs](https://docs.mongodb.com/)

---

---

## Planning the App:

##### Gneral Planning Steps:

1.) Define the app's purpose and scope.

2.) Create a wireframe.

3.) Plan your data models

4.) Plan your endpoints (API Backend) and pages (SPA Frontend).

**Build an app where users can share places (withimages & location) with other users.**

- Utilize CRUD operations( Create, Read, Update, Delete)
- Multiple data models, image upload & input validation.
- Authentication & Authorization(updating and deleting should only be available to those who created the data)

### Application Data:

- **Users** _(one user can create multiple places)_
  - Name
  - Email
  - Password
  - Image
- **Places** _(one place belongs to exactly one user)_
  - Title
  - Description
  - Address
  - Location( Latitude & Longitude)
  - Image

### API Endpoints:

- **Users**

  - GET /users
  - POST /users/signup
  - POST /users/login

- **Places**

  - GET /places
  - GET /places/:pid
  - POST /places
  - PATCH /places/:pid
  - DELETE /places/:pid

- **Images**
  - POST /places/:pid/image

##### Required SPA Pages:

`/` ---> List of Users ---> Always reachable
`/:uid/places` ---> List of places for selected user ---> Always reachable
`/authenticate` ---> Login/Signup ---> Only reachable when not authenticated
`/places/new` ---> Add new place Form --->Only reachable when authenticated
`/places/:pid` ---> Update/Delete place Form --->Only reachable when authenticated

---

---

## Frontend:

**Two main types of React Components:**

- Presentational components: These are components that are responsible for how things look. They are also called "dumb" or "stateless" components because they don't manage any state.
- Stateful components: These are components that are responsible for how things work. They are also called "smart" or "stateful" components because they manage state.


**React Router Exact Route**


```js
  <NavLink to="/" exact>
          ALL USERS
        </NavLink>
```

- in the above code the exact keyword is used to make sure that the route is only active when the path is an exact match to the current url ... alternativley written `exact={true}`
