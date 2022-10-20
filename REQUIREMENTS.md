# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: "/products"
- Show: "/products/:id"
- Create [token required]: "/products/create"
- [OPTIONAL] Products by category (args: product category): "/products/category/:category"
- [For Learning] Delete product [token required]: "/products/delete/:id"

#### Users

- Index [token required]: "/users"
- Show [token required]: "/users/:id"
- Create [No token required - because it's make any sense to have token for create new users]: "/users/create"
- [For Learning] Delete User [token required]: "/users/delete/:id"
- [For Learning] login User: "/users/login"

#### Orders

- Current Order by user (args: user id)[token required]: "/orders/create"
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: "/orders/completed/:id"
- [For Learning] Show all user order: "/orders/:id"
- [For Learning] Delete order [token required]: "/orders/delete/:id"

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- [For Learning] email (to use it for login)
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
