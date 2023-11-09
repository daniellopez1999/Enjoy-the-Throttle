// REMOVE-START
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../schemas/usersModel');

const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';
// REMOVE-END


const create = async (req, res) => {
  // REMOVE-START
  const { name, password, bikeBrand, bikeModel, bikeYear } = req.body;
  console.log(req.body)
  //check if user exists
  const user = await User.findOne({ name: name });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User Name already exists' });
  try {
    if (password === '') {
      res.status(400).send({ error: '400', message: 'Password cannot be empty' }); 
    }
    //if doesn't exist and password length is more than 0, hash it
    const hash = await bcrypt.hash(password, 10);

    //create newUser coming from User schema
      try {
        const newUser = new User({
          ...req.body,
          bikeList: [{bikeBrand, bikeModel}],
          password: hash,
        });
        console.log(newUser)
        
        //save the newUser in DB
        await newUser.save();
        res.status(201).send(`Registered ${newUser}`);
        
      } catch (err) {
        console.log(err)
        }
        
  //   const { _id } = await newUser.save();
  //   const accessToken = jwt.sign({ _id }, SECRET_KEY);
  //   res.status(201).send({ accessToken });
  // } catch (error) {
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
  // REMOVE-END
};


const login = async (req, res) => {
  // REMOVE-START
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
  // REMOVE-END
};

const profile = async (req, res) => {
  // REMOVE-START
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'Resource not found' });
  }
  // REMOVE-END
};

module.exports = { create, login, profile }