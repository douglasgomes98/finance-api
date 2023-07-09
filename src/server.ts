import { app } from "./app.";
import { ENV } from "./environment";

app
  .listen({
    host: "0.0.0.0",
    port: ENV.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server ready!`);
  });
