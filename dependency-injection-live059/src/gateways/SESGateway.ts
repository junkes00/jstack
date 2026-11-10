import { delay } from "../utils/delay.js";

export class SESGateway {
  async publishMessage(message: string): Promise<void> {
    console.info("Sending mail...");

    await delay();

    console.info(message);
  }
}
