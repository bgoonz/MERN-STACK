# MERN-STACK

### [Backend Repo](https://github.com/bgoonz/MERN-STACK-BACKEND)

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

**Properties of a Place in this project**

```jsx
<PlaceItem
  key={place.id}
  id={place.id}
  image={place.imageUrl}
  title={place.title}
  description={place.description}
  address={place.address}
  creatorId={place.creator}
  coordinates={place.location}
/>
```

### UseEffect Hook

Optional: More on the useEffect() Hook

**Hooks are an important concept** in modern React - they allow you to add various functionalities to functional components. And that's important: **Only to functional components.**

_If you're building class-based components (which you also can), you can't use hooks - you got different APIs there._

In this course, we use functional components only and hence we use Hooks. Therefore, let's have a closer look at this very important `useEffect()` hook.

We already saw `useState()` before - this allowed us to register state which then is managed inside of a component. When state is changed, the component re-renders (or to be precise: It is re-evaluated and might lead to a re-rendering of the DOM).

`useEffect()` does something different: It allows you to **register some logic** (i.e. a JS function) which will be executed when certain **dependencies** - which you define - change.

Let's have a look at the `Map` example:

```jsx
useEffect(() => {
  const map = new window.google.maps.Map(mapRef.current, {
    center: center,
    zoom: zoom,
  });

  new window.google.maps.Marker({ position: center, map: map });
}, [center, zoom]);
```

The **logic** here (i.e. the function) is to render a map + a marker on the map.

The **dependencies**, that define when this logic should re-run, are our `center` and `zoom` variables. Whenever at least one of these two dependencies changes, the function re-runs.

And that makes sense: If we got a new center or zoom level, we want to re-render the map!

However, React does not track these dependencies behind the scenes. Instead, `useEffect()` re-evaluates the dependency values **whenever the component in which you use **`**useEffect()**`** is re-evaluated **(i.e. whenever the component's props or state changed).

If the component is re-evaluated and the dependencies did NOT change, the logic in `useEffect()` won't run again.

**Important**: The `useEffect()` logic re-runs **AFTER** the component (including its JSX code) was re-evaluated. That means, that the first execution of the `useEffect()` logic (when a component mounts for the first time) will **ALWAYS** happen **AFTER** the component rendered for the first time.

You can learn more about `useEffect()` in the official docs (or my "React - The Complete Guide" course of course): <https://reactjs.org/docs/hooks-reference.html#useeffect>

**useReducer** a reducer is a function which recieves an action which we can dispatch and the current state and then updates the current state based on the action we recieved and returns the new state which use reducer gives us in the component so that we can use it to trigger a rerender.

##### New Place Form Fields:

- Title
- Description
- Image
- Address
- Cordinates

**Toggling State** _should be done by using a function that returns the negation of the current state_

```jsx
//i.e.
setIsLoginMode((prevMode) => !prevMode);
```

##### How to provide context to entire app... _(keep in mind you still need to listen for context in specific components that need it)_

```jsx
import { AuthContext } from "./shared/context/auth-context";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // we use useCallback so that the login function is not recreated on every render cycle causing an infinite loop.
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userId/places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeId">
              <UpdatePlace />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};
```

**What components are interested in authcontext?**

- **NavLinks** _if we are logged in we want to show logout and if we are not logged in we don't need to show 'my places'_

**We tap into the context provided using the useContext hook**

```jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  //here auth is an object that will hold the latest context
  /*
    const auth: {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}
    */
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authentication</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
```

---

---

---

---

## Connecting Frontend and Backend

##### CORS Policy: Cross Origin Resource Sharing _resources on a server can only be requested by the same origin (domain)_ To work around this... the server needs to attach a header to the response that allows the client to access the resource.

```js
//app.js in backend:
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
```

---

---

##### Submitting multiple types of data on a form

> FormData is builtin browser api that allows us to combine text and blob data into one object that we can send to the backend

```js
const formData = new FormData();
formData.append("email", formState.inputs.email.value);
formData.append("name", formState.inputs.name.value);
formData.append("password", formState.inputs.password.value);
formData.append("image", formState.inputs.image.value);
```


---
---


##### Authentication

**Hashing Passwords (done one backend)**

```bash
npm install bcryptjs
```

> in the code below `hashedPassword = await bcrypt.hash( password, 12 );` 12 is the number of rounds of hashing (salting) we want to do. the more rounds the more secure the password but the longer it takes to hash the password.
```js
  let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash( password, 12 );
    } catch ( err ) {
        const error = new HttpError(
            'Could not create user, error hashing password.',
            500
        );
        return next( error );
    }
    

```

---
---

**Options Requests** _for anything but GET requests... the browser sends a preceding options request to see if the server supports the request_




