const fs = require("fs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateJWT(pemFile, customPayload) {
  const payload = {
    iss: "fastify-api",
    sub: "fastify-api",
    aud: "fastify-api",
    claims: customPayload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    iat: Math.floor(Date.now() / 1000),
    jti: crypto.randomBytes(16).toString("hex"),
  };

  const token = jwt.sign(payload, fs.readFileSync(pemFile, "utf8"), {
    algorithm: "RS256",
  });
  return token;
}

function swapJWT(pemFile, token) {
  const payload = {
    iss: "fastify-api",
    sub: "fastify-api",
    aud: "fastify-api",
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    iat: Math.floor(Date.now() / 1000),
    jti: crypto.randomBytes(16).toString("hex"),
  };

  const decoded = jwt.decode(token);
  const claims = decoded.claims;
  const customPayload = { ...payload, claims };
  const newToken = jwt.sign(customPayload, fs.readFileSync(pemFile, "utf8"), {
    algorithm: "RS256",
  });
  return newToken;
}

module.exports = {
  generateJWT,
  swapJWT,
};
