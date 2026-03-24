const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    // console.log("tokenCookieValue: ", tokenCookieValue);
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      // console.log("userPayload: ", userPayload);
      req.user = userPayload;
    } catch (e) {
      console.error("Error detected: ", e);
    }
    return next();
  };
}

module.exports = checkForAuthenticationCookie;
