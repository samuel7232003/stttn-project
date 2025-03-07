const express = require('express');
const { createUser, handleLogin, getProfile, getUser, editAccount, getUsersbyId, getUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');
const { addCard, getListCard, setListCard, deleteAllCard, doneOneCard } = require('../controllers/cardController');
const { addFlashcard, getListFlashcard, deleteFlashCard } = require('../controllers/flashcardController');

const routerAPI = express.Router();

module.exports = routerAPI;

routerAPI.all("*", auth);

routerAPI.post("/signup", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/profile", getProfile);
routerAPI.get("/account", getUser);
routerAPI.post("/editAccount", editAccount);
routerAPI.post("/getUsersById", getUsersbyId);
routerAPI.get("/getAllUser", getUsers);

routerAPI.post("/addCard", addCard);
routerAPI.get("/getListCard", getListCard);
routerAPI.post("/setListCard", setListCard);
routerAPI.get("/deleteAllCard", deleteAllCard);
routerAPI.post("/doneOneCard", doneOneCard);

routerAPI.post("/addFlashcard", addFlashcard);
routerAPI.get("/getListFlashcard", getListFlashcard);
routerAPI.get("/deleteFlashcard", deleteFlashCard);

module.exports = routerAPI;