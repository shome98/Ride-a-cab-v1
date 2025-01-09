import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const captainSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    username: {
        type: String,
    },
    role: {
        type: String,
        default: "Captain"
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location: {
        latitudeo: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
}, { timestamps: true });
captainSchema.pre("save", async function (next) {
    //if(this.isModified("username")) this.username=this.email.split("@")[0];
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
captainSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
captainSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, username: this.username, role: this.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};
captainSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id, role: this.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};
captainSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes
    return { unHashedToken, hashedToken, tokenExpiry };
};
export const Captain = mongoose.models.Captain || mongoose.model("Captain", captainSchema);
