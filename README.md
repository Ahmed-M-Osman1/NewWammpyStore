# 
# 🛍️ Wamppy: A Storefront Backend Project. 🛍️

This project is a Back-End Nodejs online store. The API in this project are RESTful APIs. 

I have used Postgress database. For more information and API route please check the [REQUIREMENT.md](REQUIREMENTS.md) 

## 🗃️ Set up Database:

### 🚀 Create Databases:

You have to create the databases for dev and test.

- Create a postgres user with username postgres and password `postgres`
- In psql run the following to create a user 
    - `CREATE USER postgres WITH PASSWORD 'postgres';`

- `psql -U postgres` first. This commened will connect you to the postgres as a root user. 
-  create the dev and test database:
    - `CREATE DATABASE wamppy;`
    - `CREATE DATABASE wamppytest;`
- Connect to the databases `\c DATABASE_NAME`. For Dev: `\c wamppy` and for Test:`\c wamppytest`.


### 🏃‍♂️ Migrate Database:

For Development:

Run the following commened to migrate the DateBase:

`npx db-migrate up`

This will create all the table and relations. 

For Testing:

Run the following commened to migrate the DateBase:

`npx db-migrate up:test`

This will create all the table and relations. 

## 🏁 Installation Instructions:
In this section, you can find all the package that I have used. You can simply ``` npm i ``` or ``` yarn ``` to install them all from my [package.json](package.json)  file

`yarn` or `npm install`

### 📦 Packages:

Here are some of the few packages that were installed.

#### typescript
`npm i -D typescript`

#### express
`npm i -S express`
`npm i -D @types/express`

#### db-migrate
`npm install -g db-migrate`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

#### jasmine
`npm install jasmine @types/jasmine ts-node --save-dev`

## 🎬 Start App:
`yarn dev` or `npm run dev` to start the project in `nodmon` or `yarn start` or `npm start` to run the project locally.

### 🚪 Running Ports: 
After start up, the server will start on port `3001`.

## 🧪 Testing:
Run test with 

`yarn test` or `npm run test` to run jasmine test files.

## 🌴 Enviromental Variables Set up:

Add the information below to `.env` file before run the project:

```
DB_HOST=127.0.0.1
DB_NAME='wamppy'
DB_NAME_FOR_TEST="wamppytest"
DB_USER='postgres'
DB_PASSWORD='postgres'
TOKEN_SECRET='AHMEDMOSMAN'
PEPPER='OSMAN'
SALT_ROUNDS=12
ENV='dev'
```
#### PLEASE NOTE: that without the `.env` file the project will not going to work. You should create it.
