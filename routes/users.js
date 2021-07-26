var express = require("express");
var router = express.Router();
const userService = require("../services/userService");
const roleValidation = require("../middlewares/roleValidation");
const multer = require("../middlewares/multer");

router.get("/", roleValidation("admin"), async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/activate/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.activateUser(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signup", multer.single("avatar"), async (req, res, next) => {
  try {
    console.log(req.files);
    console.log(req.file);
    await userService.signUp(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await userService.login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

<<<<<<< HEAD
router.put("/:id", async (req, res) => {
  console.log(req.body);
=======
router.put("/:id", multer.single("avatar"), async (req, res) => {
>>>>>>> 4ae524ece23785405e17e36212f819b6776ab37d
  try {
    if (req.file) {
      req.body.avatar = req.file.path;
    }
    const { id } = req.params;
    await userService.editUser(id, req.body);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/plan/:id", multer.single("avatar"), async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.path;
    }
    const { id } = req.params;

    const user = await userService.editUser(id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userService.removeUser(id);
    res.status(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
