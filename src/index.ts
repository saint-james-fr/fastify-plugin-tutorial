import fastify from "fastify";
import autoload from "@fastify/autoload";
import { handlers } from "./use-cases";
import { repositories } from "./infrastructure/repositories";
import path from "path";

const dirName = import.meta.dirname;
const pluginsDir = path.join(dirName, "infrastructure/plugins");
const routesDir = path.join(dirName, "infrastructure/routes");

// Create the fastify instance with debug logging
const app = fastify({
  logger: {
    level: "debug", // Enable debug logging
    transport: {
      target: "pino-pretty", // Makes logs more readable
    },
  },
});

app.register(autoload, {
  dir: pluginsDir,
  forceESM: true,
});

app.register(repositories);
app.register(handlers);
app.register(autoload, {
  dir: routesDir,
  forceESM: true,
});

// Start the boot sequence
app.ready((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  app.listen({ port: 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server is running on ${address}`);
  });
});
