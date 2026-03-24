const jwt = require("jsonwebtoken");

const SECRET = "dU_dU_dU_dU_MAX_Ver$tapp3n_1";

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    profileImageURL: user.profileImageURL,
    role: user.role,
    fullName: user.fullName,
  };
  const token = jwt.sign(payload, SECRET);
  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, SECRET);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
