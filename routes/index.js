const express = require('express');
const router = express.Router();
const db = require('../DBConnecction');
const bcrypt = require('bcrypt')
const {isAuthorize,generateToken} = require('../jwtAuth')

router.get('/profile', isAuthorize , async (req, res) => {
  try {
   res.status(200).json({msg:'This is Your profile.'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
})

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(404).json({msg:'Invalid credentials. username , email, password'})
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let isExist = 'SELECT username FROM users WHERE username = ?'
    let userInsert = 'INSERT INTO users (username,email,password) VALUES(?,?,?)';
    const payload = {
      password:hashedPassword,
      username:username,
    }
    const token = generateToken(payload)
    console.log("Token :: " + token);
    db.query(isExist, username, (err, result) => {
      if (result.length > 0) return res.status(201).json({ msg: 'You are already registered.' });
      if (err) return res.status(500).json({ msg: 'Internal Server Error' });
      let values = [username, email, hashedPassword]
      db.query(userInsert, values, (err, result) => {
        if (err) return res.status(500).json({ msg: 'Internal Server Error' });
        res.status(201).json({ msg: 'User registration successful!', user: {username, email, password} , token : token})
      })

    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ msg: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }

      const payload = { username: user.username };
      const token = generateToken(payload);
      console.log("Token :: " + token);

      res.status(200).json({
        msg: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          password:user.password
        },
        token:token
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
