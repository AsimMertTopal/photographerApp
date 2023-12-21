import mongoose from "mongoose";

const { Schema } = mongoose;
const photoSchema = new Schema({
  name: {
    type: String,
    required: true /* zorunlu demek */,
    trim: true /* boşluklardan kurtulmasını sağlar */,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", /* ilişkisel kullanacagı modeli referans gösteriyoruz */
  },
  url: {
     type:String,
     required:true
  }
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
