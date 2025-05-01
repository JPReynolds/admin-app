# Interview Task

Endpoints used to retrieve/manipulate mocked data are implemented using MSW library (https://mswjs.io/) and MSW data (https://github.com/mswjs/data).

## Getting Started

### Installation
```bash
yarn install
```

### Development
To run the application in development mode:
```bash
yarn dev
```
This will start the development server at `http://localhost:5173`.

### Building for Production
To create a production build:
```bash
yarn build
```

To preview the production build locally:
```bash
yarn preview
```

### Testing
To run the test suite:
```bash
yarn test
```

## List of available BFF endpoints:

GET - https://example.com/user - Retrieve all available users  
GET - https://example.com/user/:id - Retrieve user with a certain id  
POST - https://example.com/user - Create a new user. Provide first name  
PUT - https://example.com/user/:id - Edit a user. Provide first name  
DELETE - https://example.com/user/:id - Delete a user


## TODO
- [ ] error handling
- [ ] loading states
- [ ] optimistic updates
- [ ] display validation error for date picker
- [ ] increase test coverage
