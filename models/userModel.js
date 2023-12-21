import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true,"Kullanıcı adı zorunlu"],
      lowercase:true,
      trim: true,
      validate:[validator.isAlphanumeric,"Kullanıcı Adı geçersiz karakterlerden oluşmaktadır"]

    },
    email: {
      type: String,
      required: [true,"E mail Zorunlu"],
      unique: true,
      validate : [validator.isEmail,"E mail geçersiz"]
    },
    password: {
      type: String,
      required: [true,"Şifre Girmek Zorunlu"],
      minLength:[4,"Şifre En az 4 karakterden oluşmalı"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
