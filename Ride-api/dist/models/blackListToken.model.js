import mongoose, { Schema } from "mongoose";
const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
}, { timestamps: true });
export const BlackListToken = mongoose.models.BlackListToken || mongoose.model('BlackListToken', blacklistTokenSchema);
