const express = require("express")
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
        const token = jwt.sign({ userID: user.id }, "Mega safe")
        
        res.cookie("token", token)
        
        res.json({
            message: `Welcome ${user.username}!`,
        })
      }
      else{}
    }
    else{ 
      return res.status(401).json({ message: "You shall not pass!" })
    }
  }
  catch(err){
    next(err)
  }
})

module.exports = router;
