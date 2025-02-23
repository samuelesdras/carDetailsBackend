import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const user: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/user",
    {
      schema: {
        summary: "Add a user",
        tags: ["User"],
        description: "This route is used do add a user on this system.",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
          phone: z.string(),
          isWhatsapp: z.boolean(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, phone, isWhatsapp } = request.body;
      return reply.status(201).send({
        name,
        email,
      });
    }
  );
};
