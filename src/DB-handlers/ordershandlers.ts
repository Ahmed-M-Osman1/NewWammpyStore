// import models, express and verifyUser
import {
  Order,
  order_products,
  OrderModel,
} from '../DB-models/ordersModels';
import express, { Request, Response } from 'express';
import { verifyUser } from '../helpersAuthFunction/jwtAuthFun';

// create new orders models:
const Order = new OrderModel();

// Delete route: delete orders:
const deleteOrderRoute = async (req: Request, res: Response) => {
  try {
    // verify token
    await verifyUser(req);
    const orderID = Number(req.params.id);
    const delOrder = await Order.deleteOrder(orderID);
    // send the response to user:
    res.send(delOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create route: create new orders:
const createRoute = async (req: Request, res: Response) => {
  try {
    const { status, user_id } = req.body;
    // verify token
    await verifyUser(req);
    const order: Order = { status, user_id };
    const newOrder = await Order.create(order);
    // send the response to user:
    res.send(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Show route: show all complets orders for a user:
const showUserCompletedOrdersRoute = async (
  req: Request,
  res: Response
) => {
  try {
    // get ID
    const UserID = Number(req.params.id);
    const showUserCompletedOrders =
      await Order.showUserCompletedOrders(UserID);
    // send the response to user:
    res.send(showUserCompletedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Add product to order route: create new orders:
const addProductToOrderRoute = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id, pro_id, quantity } = req.body;
    // verify token
    await verifyUser(req);
    const order: order_products = { order_id, pro_id, quantity };
    const newOrder = await Order.addProductToOrder(order);
    // send the response to user:
    res.send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Show route: show User orders:
const showUserOrderRoute = async (req: Request, res: Response) => {
  try {
    // get ID
    const UserID = Number(req.params.id);
    const showUserOrders = await Order.showUserOrder(UserID);
    // send the response to user:
    res.send(showUserOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// index route: show all orders:
const indexRoute = async (req: Request, res: Response) => {
  try {
    // call orders method from models:
    const allOrders = await Order.index();
    // send the response to user:
    res.send(allOrders);
    // if there is an error:
  } catch (error) {
    // send error to the user:
    res.status(500).json(error);
  }
};

// available routes:
const orders_routes = (app: express.Application) => {
  // Post Routes:
  app.post('/orders/create', createRoute);
  app.post('/orders/addProduct', addProductToOrderRoute);
  // get Routes:
  app.get('/orders', indexRoute);
  app.get('/orders/:id', showUserOrderRoute);
  app.get('/orders/completed/:id', showUserCompletedOrdersRoute);
  // delete Routes:
  app.delete('/orders/delete/:id', deleteOrderRoute);
};

export default orders_routes;
