import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, "First name must be atleast 3 characters"]
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be atleast 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "User"
    },
    socketId: {
        type: String,
    }
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    //if(this.isModified("username")) this.username=this.email.split("@")[0];
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, username: this.username, role: this.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};
userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes
    return { unHashedToken, hashedToken, tokenExpiry };
};
export const User = mongoose.models.User || mongoose.model("User", userSchema);
