import { Order } from "../entities/Order.js";
import { SESGateway } from "../gateways/SESGateway.js";
import { SQSGateway } from "../gateways/SQSGateway.js";
import { OrdersRepository } from "../repository/OrdersRepository.js";

export class PlaceOrder {
  async execute() {
    const customerEmail = "nicolas@mail.com";
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);
    const orderRepository = new OrdersRepository();
    const sqsGateway = new SQSGateway();
    const sesGateway = new SESGateway();

    const orderId = await orderRepository.create(order);
    await sqsGateway.publishMessage({ orderId: order.id })
    await sesGateway.publishMessage(`Order ${order.id} created with success!`);

    return { orderId };
  }
}
