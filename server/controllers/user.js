const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../schemas/usersModel');
const createAccessToken = require('../libs/jwt');

const create = async (req, res) => {
  const { name, password, bikeBrand, bikeModel } = req.body;
  //check if user exists
  const user = await User.findOne({ name: name });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User Name already exists' });
  try {
    if (password === '') {
      res
        .status(400)
        .send({ error: '400', message: 'Password cannot be empty' });
    }
    const passwordHashed = await bcrypt.hash(password, 10);

    //create newUser coming from User schema
    try {
      const newUser = new User({
        ...req.body,
        bikeList: [{ bikeBrand, bikeModel }],
        password: passwordHashed,
      });

      //save the newUser in DB
      const userSaved = await newUser.save();

      //JWT
      const token = await createAccessToken({ id: userSaved._id });

      res.cookie('token', token);
      res.json({
        id: userSaved._id,
        name: userSaved.name,
        groupList: userSaved.groupList,
        bikeList: userSaved.bikeList,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      });
    } catch (err) {
      console.error(err);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const userFound = await User.findOne({ name: name });
    if (!userFound)
      return res.status(400).json({ message: 'User or Password not found' });

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch)
      return res.status(400).json({ message: 'User or Password not found' });

    const token = await createAccessToken({ id: userFound._id });

    req.session.uid = userFound._id;
    req.session.token = token;

    res.json({
      id: userFound._id,
      name: userFound.name,
      groupList: userFound.groupList,
      bikeList: userFound.bikeList,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.status(200).send({ message: 'Logout successfully' });
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user._id);

  if (!userFound) return res.status(400).json({ message: 'User not found' });
  return res.json({
    id: userFound._id,
    name: userFound.name,
    groupList: userFound.groupList,
    bikeList: userFound.bikeList,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

const getUserName = async (req, res) => {
  let userIDForUserName = req.params.userID;
  const userNameFoundByID = await User.findById(userIDForUserName);

  res.json({ userName: userNameFoundByID.name });
};

module.exports = { create, login, logout, profile, getUserName };
