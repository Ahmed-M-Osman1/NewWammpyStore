import express from "express";
import users_routes from "./DB-handlers/usershandlers";
import products_routes from "./DB-handlers/productshandlers";
import orders_routes from "./DB-handlers/ordershandlers";

const app = express();
const port = 3001;

// use bodyparser to send req in urlencoded form.
app.use(express.json());

app.get("/", async (_req, res) => {
  res.send("Welcome to Wammpy. An Online storeFront using Node.js.");
});

users_routes(app);
products_routes(app);
orders_routes(app);
app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
export default app;
