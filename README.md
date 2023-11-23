# Project Instructions

### How to run the application locally

Clone the project

```bash
  git clone https://github.com/nazmulhasannasim333/assignment-two-mongoose
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
 npm run start:dev
```

- Open postman

-Create a user

```http
  http://localhost:5000/api/users
```

-Get all users

```http
  http://localhost:5000/api/users
```

-Get specific a users

```http
  http://localhost:5000/api/users/:userId
```

-Update specific a users

```http
  http://localhost:5000/api/users/:userId
```

-Delete specific a users

```http
  http://localhost:5000/api/users/:userId
```

-Insert a orders to specific user collection

```http
  http://localhost:5000/api/users/:userId/orders
```

-Get specific user orders

```http
  http://localhost:5000/api/users/:userId/orders
```

-Get specific user orders total price

```http
  http://localhost:5000/api/users/7/orders/total-price
```
