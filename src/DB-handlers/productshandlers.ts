// import models, express and verifyUser
import { Product, ProductModel } from '../DB-models/productsModels';
import express, { Request, Response } from 'express';
import { verifyUser } from '../helpersAuthFunction/jwtAuthFun';
// create new Product models:
const Products = new ProductModel();

// Delete route: delete orders:
const deleteProductRoute = async (req: Request, res: Response) => {
  try {
    // verify token
    await verifyUser(req);
    const productID = Number(req.params.id);
    const delProduct = await Products.deleteProduct(productID);
    // send the response to user:
    res.send(delProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Show route: show all product for a category:
const selectCategoryRoute = async (req: Request, res: Response) => {
  try {
    // get ID
    const category = String(req.params.category);
    const selectOneCategory = await Products.selectCategory(category);
    // send the response to user:
    res.send(selectOneCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Show route: show a product:
const showRoute = async (req: Request, res: Response) => {
  try {
    // get ID
    const productID = Number(req.params.id);
    const showProduct = await Products.show(productID);
    // send the response to user:
    res.send(showProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create route: create new product:
const createRoute = async (req: Request, res: Response) => {
  try {
    // verify token
    await verifyUser(req);
    const { name, price, category } = req.body;
    const product: Product = { name, price, category };
    const newProduct = await Products.create(product);
    // send the response to user:
    res.send(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// index route: show all products:
const indexRoute = async (req: Request, res: Response) => {
  try {
    // call product index method from models:
    const allProducts = await Products.index();
    // send the response to user:
    res.send(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// available routes:
const products_routes = (app: express.Application) => {
  // get Routes:
  app.get('/products', indexRoute);
  app.get('/products/:id', showRoute);
  app.get('/products/category/:category', selectCategoryRoute);
  // Post Route:
  app.post('/products/create', createRoute);
  // Delete Route:
  app.delete('/products/delete/:id', deleteProductRoute);
};

export default products_routes;
