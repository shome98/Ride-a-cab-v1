import mongoose, { Document, Schema } from "mongoose";

export interface IBlackListToken extends Document{
    token:string;
    createdAt:Date;
}
const blacklistTokenSchema = new Schema<IBlackListToken>({
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
},{timestamps:true});

export const BlackListToken = mongoose.models.BlackListToken||mongoose.model<IBlackListToken>('BlackListToken', blacklistTokenSchema);