import { randomUUID } from "node:crypto";
import type { Order } from "../entities/Order.js";
import { apiClient } from "../service/http/instance.js";
import { delay } from "../utils/delay.js";

interface IOrderItem {
  orderId: string;
  tableName: string;
  item: {
    id: string;
    email: string;
    amount: number;
  };
};

export class OrdersRepository {
  async create(order: Order): Promise<string> {
    const command: IOrderItem = {
      orderId: order.id,
      tableName: "Orders",
      item: {
        id: randomUUID(),
        email: order.email,
        amount: order.amount,
      },
    };

    try {
      console.info("Saving order...");
      console.info("Items: ", command);

      await delay();

      const response = await apiClient.post<{ id: string }>("/orders", command);
      return response.id;
    } catch (error) {
      console.error(error);
      throw new Error("An unexpected error happens.");
    }
  }
}
