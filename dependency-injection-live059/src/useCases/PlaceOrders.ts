import { randomUUID } from "node:crypto";
import { Order } from "../entities/Order.js";
import { OrdersRepository } from "../repository/OrdersRepository.js";

export class PlaceOrder {
  async execute() {
    const customerEmail = "nicolas@mail.com";
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);
    const orderRepository = new OrdersRepository();
    const orderId = await orderRepository.create(order);
    return { orderId };
  }
}
