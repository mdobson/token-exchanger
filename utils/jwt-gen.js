const fs = require("fs");
const jwt = require("jsonwebtoken");

// Read the private key from the file
const privateKey = fs.readFileSync("privateKey.pem", "utf8");

// Define the payload for the JWT
const payload = {
  username: "john.doe",
  role: "admin",
  foo: "bar", // Arbitrary data
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
};

// Create the token
const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

// Output the generated JWT
console.log(`Generated JWT: ${token}`);
