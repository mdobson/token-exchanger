const crypto = require("crypto");
const fs = require("fs");

function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // 2048 bits is generally considered as secure
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  // Save public key
  fs.writeFileSync("publicKey2.pem", publicKey);

  // Save private key
  fs.writeFileSync("privateKey2.pem", privateKey);

  console.log("Public and private keys have been generated and saved.");
}

generateKeys();
