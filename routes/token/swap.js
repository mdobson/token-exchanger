const { swapJWT } = require("../../lib/token");

module.exports = async function (fastify, opts) {
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
          required: ["token"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { token } = request.body;

      // Perform your token validation and generation logic here.
      // For demonstration, let's assume the new token is 'new-token-123'.
      const newToken = swapJWT("privateKey2.pem", token);

      // Set headers
      reply.header("x-auth-original", token);
      reply.header("x-auth-new", newToken);

      // Send response
      return { token: newToken };
    }
  );
};
