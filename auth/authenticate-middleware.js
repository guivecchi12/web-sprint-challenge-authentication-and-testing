/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require("bcryptjs")
const Users = require("./auth-model")

function restrict() {
	const authError = {
		message: "Invalid credentials",
	}

	return async (req, res, next) => {
		if(req.session && req.session.user){
      return next()
    } else {
      res.status(401).json({ message: "Failed" });
    }
  }
}
module.exports = restrict;
