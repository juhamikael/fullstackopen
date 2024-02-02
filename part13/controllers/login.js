// controller/login.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const User = require('../models/user');

router.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ 
    where: { 
      username: body.username
    }
  });

  const passwordCorrect = user 
    ? await bcrypt.compare(body.password, user.password)
    : false;

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username, 
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: '10h' }); 

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;