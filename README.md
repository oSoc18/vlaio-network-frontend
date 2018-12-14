# VLAIO Connect frontend

A data visualisation project in cooperation with VLAIO - Flemish Agency for Innovation and Enterpreneurship.
Works with a [Django REST API](https://github.com/oSoc18/vlaio-network-backend).

## Getting started

Install dependencies  
`yarn` or `npm i`

Run dev server with hot reloading  
`npm start`

Create a production build  
`npm run build`

Data is generated when building the backend's Docker container. If its location is not `http://localhost:8000/api`, you can set your base API url in a `.env` file of the root of this project:

```
REACT_APP_API_URL=<your url>
```
