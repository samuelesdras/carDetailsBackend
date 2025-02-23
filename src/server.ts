import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { user } from "./routes/user";
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  //origin: 'http://localhost:3000'
  origin: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Car Details",
      version: "0.0.1",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(user);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running on port:", env.PORT);
});
