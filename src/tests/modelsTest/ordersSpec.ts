import {
  Order,
  order_products,
  OrderModel,
} from '../../DB-models/ordersModels';
import { User, UsersModel } from '../../DB-models/usersModels';
import { Product, ProductModel } from '../../DB-models/productsModels';

// Create a user:
const UserModel = new UsersModel();
const testUser: User = {
  firstname: 'ahmed',
  lastname: 'mamdouh',
  email: 'ahmed@udacity.com',
  password: 'password',
};

// Create a product:
const ProductsModel = new ProductModel();
const testProduct: Product = {
  name: 'testItem',
  price: 1.0,
  category: 'test',
};

const OrdersModel = new OrderModel();
const testOrder: Order = {
  status: 'active',
  user_id: 0,
};

const testProductAddToOrder: order_products = {
  order_id: 0,
  pro_id: 0,
  quantity: 2,
};

let newOrder: Order;
let newProductAddedToOrder: order_products;

describe('Testing OrdersModel: ', () => {
  beforeAll(async () => {
    const newUser = await UserModel.create(testUser);
    const newProduct = await ProductsModel.create(testProduct);
    if (newUser.id) testOrder.user_id = newUser.id;
    if (newProduct.id) testProductAddToOrder.pro_id = newProduct.id;
  });
  it('Test the create methods', () => {
    expect(OrdersModel.create).toBeDefined();
  });
  it('Test the create methods with testOrder data', async () => {
    newOrder = await OrdersModel.create(testOrder);
    if (newOrder.id) testProductAddToOrder.order_id = newOrder.id;
    expect({
      user_id: newOrder.user_id,
      status: newOrder.status,
    }).toEqual({
      user_id: testOrder.user_id,
      status: testOrder.status,
    });
  });
  it('Test the index methods with testOrder data', () => {
    expect(OrdersModel.index).toBeDefined();
  });

  it('Test the index methods with testOrder data', () => {
    expect(OrdersModel.index).toBeDefined();
  });

  it('Test the addProductToOrder methods', async () => {
    expect(OrdersModel.addProductToOrder).toBeDefined();
  });

  it('Test the addProductToOrder methods with testProductAddToOrder data', async () => {
    newProductAddedToOrder = await OrdersModel.addProductToOrder(
      testProductAddToOrder
    );
    expect({
      order_id: newProductAddedToOrder.order_id,
      pro_id: newProductAddedToOrder.pro_id,
      quantity: newProductAddedToOrder.quantity,
    }).toEqual({
      order_id: testProductAddToOrder.order_id,
      pro_id: testProductAddToOrder.pro_id,
      quantity: testProductAddToOrder.quantity,
    });
  });

  it('Test the show methods', () => {
    expect(OrdersModel.showUserOrder).toBeDefined();
  });
  it('Test the delete method', () => {
    expect(OrdersModel.deleteOrder).toBeDefined();
  });

  it('Test the delete method to return the deleted Order', async () => {
    const deletedOrder = await OrdersModel.deleteOrder(
      newOrder.id as number
    );
    expect(deletedOrder.id).toEqual(newOrder.id);
  });
});
