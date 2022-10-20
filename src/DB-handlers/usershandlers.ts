// import models, express and verifyUser
import { User, UsersModel } from '../DB-models/usersModels';
import express, { Request, Response } from 'express';
import {
  verifyUser,
  SignIn,
} from '../helpersAuthFunction/jwtAuthFun';

// create new orders models:
const User = new UsersModel();

// signIn route: sign in to get the token:
const signRoute = async (req: Request, res: Response) => {
  // get email and password
  const { email, password } = req.body;
  try {
    // login in function:
    const signInUser = await User.login(email, password);
    // if user can't login:
    if (signInUser === null) {
      res.status(401);
      res.json('Incorrect user information');
    } else {
      // user login successfully:
      var token = SignIn(Number(signInUser.id));
      res
        .status(200)
        .json(`User successfully login and the token is : ${token}`);
    }
  } catch (error) {
    const e = error as Error;
    res.status(401).send(e.message);
  }
};

// Show route: show an user:
const showRoute = async (req: Request, res: Response) => {
  try {
    // get ID
    const userID = Number(req.params.id);
    // verify user
    await verifyUser(req, userID);
    const showUser = await User.show(userID);
    // send the response to user:
    res.send(showUser);
  } catch (error) {
    const e = error as Error;
    if (
      e.message.includes(
        'user you ask for does not match with current user token - please provide a correct user ID'
      )
    ) {
      res.status(401).json(e.message);
    } else {
      res.status(500).json(e.message);
    }
  }
};

// index route: show all Users:
const indexRoute = async (req: Request, res: Response) => {
  try {
    await verifyUser(req);
    const users = await User.index();
    res.status(200).send(users);
  } catch (error) {
    const e = error as Error;
    console.log(e);
    res.status(500).json(e.message);
  }
};

// Delete route: delete user:
const deleteUserRoute = async (req: Request, res: Response) => {
  try {
    // get ID:
    const userID = Number(req.params.id);
    // verify token
    await verifyUser(req, userID);
    const delUser = await User.deleteUser(userID);
    // send the response to user:
    res.send(delUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create route: create new user:
const createRoute = async (req: Request, res: Response) => {
  try {
    // get data from body:
    const { firstname, lastname, email, password } = req.body;
    const userDate: User = { firstname, lastname, email, password };
    const newUser = await User.create(userDate);
    const token = SignIn(Number(newUser.id));
    // send the response to user:
    res.send(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

// available routes:
const users_routes = (app: express.Application) => {
  // All get Routes:
  app.get('/users', indexRoute);
  app.get('/users/:id', showRoute);
  // All post Routes:
  app.post('/users/create', createRoute);
  app.post('/users/login', signRoute);
  // All delete Routes:
  app.delete('/users/delete/:id', deleteUserRoute);
};

export default users_routes;
