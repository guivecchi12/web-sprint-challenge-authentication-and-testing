const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./auth-model")
const restrict = require("./authenticate-middleware")

const router = require('express').Router();

router.post('/register', async (req, res, next) => {
  // implement registration
  try{
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    if ( user ){
      return res.status(409).json({
        message: "Username not available"
      })
    }
    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14)
    })
    res.status(201).json(newUser)
  }
  catch(err){
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try{
    const { username, password } = req.body
    const user = await Users.findBy( {username} ).first()
    if(user){
      const passwordValid = await bcrypt.compare(password, user.password)
      if(passwordValid){
        
        req.session.user = user
        
        res.json({
            message: `Welcome ${user.username}!`,
        })
      }
      else{
        return res.status(401).json({ message: "You shall not pass!" })
      }
    }
    else{ 
      return res.status(401).json({ message: "You shall not pass!" })
    }
  }
  catch(err){
    next(err)
  }
})

router.get("/users", restrict(),  async (req, res, next) =>{
  
  try{
    res.json(await Users.findAll())
  }
  catch(err){next(err)}

})

module.exports = router;
