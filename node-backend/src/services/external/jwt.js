const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const privateKeyPath = path.join(__dirname, "../../../certs/private.key");
const privateKey = fs.readFileSync(privateKeyPath);

const publicKeyPath = path.join(__dirname, "../../../certs/public.key");
const publicKey = fs.readFileSync(publicKeyPath);
const encryptionAlgorithm = "RS256";

const that = {};

that.decryptToken = (token) => {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: [encryptionAlgorithm],
    });
    return decoded;
  } catch (err) {
    throw err;
  }
};

that.generateToken = (userInfo) => {
  try {
    const token = jwt.sign(userInfo, privateKey, {
      algorithm: encryptionAlgorithm,
    });

    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = that;
