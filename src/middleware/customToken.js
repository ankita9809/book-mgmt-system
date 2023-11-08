const { ENV } = require("../config/env");
const { unAuthResponse } = require("../utils/response");

/**
 * @function checkCustomToken
 * @description function to check custom token
 * @author Ankita
 */
exports.checkCustomToken = async (req, res, next) => {
  try {
    const customToken = req.headers["authkey"];
    if (!customToken) return unAuthResponse(res);

    if (customToken !== ENV.CUSTOM_TOKEN) return unAuthResponse(res);
    next();
  } catch (error) {
    return unAuthResponse(res);
  }
};