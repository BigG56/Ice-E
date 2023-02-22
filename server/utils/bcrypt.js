const bcrypt = require("bcrypt");
const saltRounds = 10;

//Hash password
const hashPassword = (password) => {
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

//Compare hashed password
const comparePassword = (password, hashedPassword) => {
  const comparedPassword = bcrypt.compare(password, hashedPassword);
  return comparedPassword;
};

module.exports = { hashPassword, comparePassword };