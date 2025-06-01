import fastify from "fastify";
import autoload from "@fastify/autoload";
import handlers from "./use-cases";
import repositories from "./infrastructure/repositories";
import path from "path";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const dirName = import.meta.dirname;
const pluginsDir = path.join(dirName, "infrastructure/plugins");
const routesDir = path.join(dirName, "infrastructure/routes");

const app = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

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

app.ready((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  app.listen({ port: 3000 }, (err, _address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
});
