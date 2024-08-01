const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(500).send("Already Registered");
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.send(err.message);
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        }
        const user = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("User Registered");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send("user not found");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.send(err.message);
      }

      if (result) {
        const token = generateToken(user);
        res.cookie("token", token);
       return res.send("Loged-In");
      } 
        res.send("user not found");

    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.logoutUser = async function(req,res){
     req.cookie.token = "";
     res.redirect("/");
};
