import mongoose, { Document, Schema } from "mongoose";

interface IRide extends Document{
    user:string|Schema.Types.ObjectId;
    captain:string|Schema.Types.ObjectId;
    pickup:string;
    destination:string;
    fare:number;
    status:string;
    duration:number;
    distance:number;
    paymentId:string;
    orderId:string;
    signature:string;
    otp:string;
}
const rideSchema = new Schema<IRide>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', "ongoing", 'completed', 'cancelled'],
        default: 'pending',
    },

    duration: {
        type: Number,
    }, // in seconds

    distance: {
        type: Number,
    }, // in meters

    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },

    otp: {
        type: String,
        select: false,
        required: true,
    },
}, { timestamps: true });

export const Ride=mongoose.models.Ride||mongoose.model<IRide>("Ride",rideSchema);