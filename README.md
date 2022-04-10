# !!!!!!!!!!!!!!!!!!!!!!!!!
# THIS APP IS JUST BEING BUILT
## It might take a week or three to finish
# !!!!!!!!!!!!!!!!!!!!!!!!!


# REACT STARTER TEMPLATE (CLIENT)

## What is this?
A starter template with features almost all apps need so you can save time coding.

## Features
- Auth: Sign in/up/out; ProtectedRoutes, AdminRoutes, Admin Panel
- Items: generic items that can be modified as needed (e.g.: items to posts, blogs, products, to-dos, whatever...), CRUD, items support image upload, each item has one category and multiple tags => items can be searched y these
- 

## How to run
1. git clone https://github.com/FeroHriadel/reactstarterclient.git
2. npm install
3. npm start (will start dev. server on localhost:3000)
4. create .env file in the root with the following variables:
- REACT_APP_DOMAIN=http://localhost:3000
- REACT_APP_API=http://localhost:5000/api
 ...(COMPLETE LATER)
5. You will also need to clone the server-side code: https://github.com/FeroHriadel/reactstarterserver.git

## Technologies:
- TS
- Jest, React-Testing-Library
- SASS
- Bootstrap
- React Context
- Redux Toolkit (I know, why Redux & Context together?... so you have a template to copy from)


## Templates:
The code style is varied in order to cover more use cases (you might want to be more consistent in a real project)

### Redux Template:
- redux toolkit setup: /src/store.ts & /src/slices/categoriesSlice.ts
- dispatch from component template: /src/slices/categoriesSlice.ts, /src/actions/categoryActions > createCategory, /src/pages/AdminCategoriesPage.tsx

### Router Template:
- Protected Route: /src/components/ProtectedRoute.tsx, /src/App.tsx
- Nested Routes: /src/components/App.tsx