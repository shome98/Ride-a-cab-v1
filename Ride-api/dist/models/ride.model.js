import mongoose, { Schema } from "mongoose";
const rideSchema = new Schema({
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
export const Ride = mongoose.models.Ride || mongoose.model("Ride", rideSchema);
