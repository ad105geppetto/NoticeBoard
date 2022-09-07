const crypto = require("crypto");

const hashPassword = (password) => {
  const salt = crypto.randomBytes(64).toString("base64");
  const iterations = 10000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha256").toString("base64");

  return {
    salt: salt,
    hash: hash,
  };
};

module.exports = hashPassword;
