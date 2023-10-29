const fs = require("fs");
const shamir = require("shamirs-secret-sharing");

// Read the private key from the file
const privateKey = fs.readFileSync("privateKey.pem");

// Split the secret into 5 shares with a threshold of 3
const shares = shamir.split(privateKey, { shares: 5, threshold: 3 });

// Write each piece to a separate file
for (let i = 0; i < shares.length; i++) {
  const filename = `piece_${i + 1}.hex`;
  fs.writeFileSync(filename, shares[i].toString("hex"));
  console.log(`Written piece ${i + 1} to ${filename}`);
}

console.log("Private key has been split into 5 pieces.");
