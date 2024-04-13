import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpires: Date,
  verifyToken: String,
  verifyTokenExpires: Date,
});
// !! when written read as models when creating its model, this will cause overwrite error
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
