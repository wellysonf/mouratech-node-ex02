import fastify from "fastify";
import { transactionsRoutes } from "./routes/transactions.js";
import { usersRoutes } from "./routes/users.js";

export const app = fastify();

app.register(transactionsRoutes, {
    prefix: 'transactions',
  });
app.register(usersRoutes, {
    prefix: 'users',
  });