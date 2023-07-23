const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Create a new Express app
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
// Connect to the local MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Error connecting to database:', err);
});

// Define a mongoose schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Define a mongoose model based on the schema
const User = mongoose.model('User', UserSchema);

// Set up a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.get('/user_list', (req, res) => {
  User.find({}).then(userList => {
    res.send(userList);
  })
  .catch(error => {
    // Handle any errors that occurred during the query
    console.error(error);
    res.status(500).send('Internal Server Error');
  });
});
app.post('/users', async (req, res) => {
  // Logic to create a new user
  const { error } = validate(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  else{
    const user = new User(_.pick(req.body, ['name', 'email']));
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
  }
});
app.delete('/delete_users/:userId', async (req, res) => {
  const userId = { _id: req.params.userId };
  try {
    await User.deleteOne(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.put('/edit_users/:userId', async (req, res) => {

  const { error } = validate(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  const userId = {_id: req.params.userId};
  const updatedUserData = req.body;
  try{
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = updatedUserData.name;
    user.email = updatedUserData.email;

    // Save the changes to the user
    const updatedUser = await user.save();

  }
  catch{
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username);

  // Check if user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check password
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });

  // Send token as response
  res.json({ token });
});
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(user);
}

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});