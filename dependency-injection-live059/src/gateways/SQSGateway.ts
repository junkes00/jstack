import { delay } from "../utils/delay.js";

export class SQSGateway {
  async publishMessage(message: Record<string, unknown>): Promise<void> {
    console.info("Sending message...");

    await delay();

    console.info(message);
  }
}
