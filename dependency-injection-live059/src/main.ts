import fastify from "fastify";
import { PlaceOrder } from "./useCases/PlaceOrders.js";

const app = fastify();

app.post("/orders", async (request, reply) => {
  const placeOrder = new PlaceOrder();

  const putItemCommand = await placeOrder.execute();

  reply.status(201).send(putItemCommand);
})

app.listen({ port: 8080 })
  .then(() => {
    console.log("> Server started at http://localhost:8080");
  })
  .catch((error) => {
    console.error("> An unexpected error was happen", error);
  });
