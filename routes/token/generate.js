"use strict";

const { generateJWT } = require("../../lib/token.js");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    const token = generateJWT("privateKey.pem", {
      user: "my@email.com",
      role: "admin",
      resources: ["resource1", "resource2"],
    });

    return reply.send({ token });
  });
};
