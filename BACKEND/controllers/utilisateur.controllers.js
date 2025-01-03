const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

const users = [
  {
    id: uuidv4(),
    nom: "martin",
    prenom: "jean",
    login: "marsstin",
    email : "martin.jean@gmail.com",
    password : "toto",
  }
];

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

function getUserByLogin(login) {
  return users.find(user => user.login === login);
}

function getUserById(id) {
  return users.find(user => user.id === id);
}

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const credentials = {
    login: req.body.login,
    password: req.body.password
  };

  const user = getUserByLogin(credentials.login);

  if (!user || user.password !== credentials.password) {
    return res.status(401).send({ message: 'Invalid login or password' });
  }

  const data = {
    id: user.id,
    name: user.nom,
    email: user.email
  };
  
  let accessToken = generateAccessToken(data);
  res.setHeader('Authorization', `Bearer ${accessToken}`);
  console.log (accessToken);

  res.send(data);
};

exports.register = (req, res) => {
  const user = {
    id: uuidv4(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  };

  if(getUserByLogin(user.login)) {
    return res.status(400).send({ message: 'User already exists' });
  }

  users.push(user);

  const data = {
    id: user.id,
    name: user.nom,
    email: user.email
  };

  res.send(data);
}

exports.update = (req, res) => {
  const user = getUserById(req.token.payload.id);

  if (!user) {
    return res.status(500).send({ message: 'User not found' });
  }

  user.nom = req.body.nom;
  user.prenom = req.body.prenom;
  user.email = req.body.email;
  user.password = req.body.password || user.password;
  
  const data = {
    id: user.id,
    name: user.nom,
    email: user.email
  };

  res.send(data);
}

exports.info = (req, res) => {
  const user = getUserById(req.token.payload.id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  const data = {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email
  };

  res.send(data);
}

