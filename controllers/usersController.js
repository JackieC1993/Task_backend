const express = require('express')
const users = express.Router()
require("dotenv").config()
// Package to generate tokens to authenticate users when sending requests
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { createUser, getUsers, logInUser } = require('../queries/users')
const tasksController = require('./tasksController')
users.use('/:user_id/tasks', tasksController)



users.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

users.post("/login", async (req, res) => {
    try {
      const user = await logInUser(req.body);
      if (!user) {
        res.status(401).json({ error: "Invalid username or password" });
        return; // Exit the function
      }
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        secret
      );
  
      res.status(200).json({
        user: {
          user_id: user.user_id,
          user: user.username,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal user login server error" });
    }
  });

module.exports = users