import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Photo from "../models/photoModel.js";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user : user._id})
  } catch (error) {

 let errors2 = {}

 if (error.code === 11000) {
  errors2.email = 'E mail Kayıtlı !';
}


 if (error.name === "ValidationError") {
  Object.keys(error.errors).forEach((key) => {
    errors2[key] = error.errors [key].message
  })
  
 }
 


    res.status(400).json(errors2);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    let same = false;
    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "Kullanıcı Bulunamadı",
      });
    }
    if (same) {
      const token = createToken(user._id)
      res.cookie("jwt",token, {
        httpOnly:true,
        maxAge: 1000*60*60*24,
      })
    
     res.redirect("/users/dashboard")
    } else {
      res.status(401).json({
        succeded: false,
        error: " Şifre Hatalı ! ! !",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage =  async(req, res) => {
  const photos=await Photo.find({user: res.locals.user._id})
  res.render("dashboard", {
    link: "dashboard",
    photos
  });
};

export { createUser, loginUser ,getDashboardPage};