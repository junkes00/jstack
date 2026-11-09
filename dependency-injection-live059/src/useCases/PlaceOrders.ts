import { randomUUID } from "node:crypto";
import { Order } from "../entities/Order.js";
import { apiClient } from "../service/http/instance.js";
import { delay } from "../utils/delay.js";

interface IItemCommand {
  orderId: string;
  tableName: string;
  item: {
    id: string;
    email: string;
    amount: number;
  };
}

export class PlaceOrder {
  async execute() {
    const customerEmail = "nicolas@mail.com";
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);

    const putItemCommand: IItemCommand = {
      orderId: order.id,
      tableName: "Orders",
      item: {
        id: randomUUID(),
        email: customerEmail,
        amount,
      },
    };

    await delay();

    try {
      console.info("Saving order...");
      const response = await apiClient.post("/orders", putItemCommand);
      console.info("Items: ", response);
      return { orderId: order.id, putItemCommand };
    } catch (error) {
      console.error(error);
    }
  }
}
