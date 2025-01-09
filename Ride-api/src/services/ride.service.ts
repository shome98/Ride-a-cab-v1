import { ICaptain } from "../models/captain.model";
import { getDistanceTime } from "./map.service";
import crypto from "crypto";
import { Ride } from "../models/ride.model";

export async function calculateFare(pickup:string,destination:string){
    if(!pickup || !destination) throw new Error("Pick and destination both are required ");
    try {
      const distanceTime=await getDistanceTime(pickup,destination);
      const baseFare={auto:30,car:50,moto:20};
      const perKMRate={auto:10,car:15,moto:8};
      const perMinuteRate={auto:2,car:3,moto:1.5};
      if(distanceTime){
          const fare={
              auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKMRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
              car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKMRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
              moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKMRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
          };
          return fare;
      }
    } catch (error) {
      throw new Error(`Error occured: ${error}`);
    }
    return {};
}

export function generateOtp(num:number) {
    const otp: string = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

export async function confrimRide({ rideId, captain }: { rideId: string; captain: ICaptain }) {
    if (!rideId) throw new Error("Ride id is required!!!");
    try {
      await Ride.findByIdAndUpdate({ _id: rideId }, { status: "accepted", captain: captain._id });
      const ride = await Ride.findById({ _id: rideId }).populate("user").populate("captain").select("+otp");
      if (!ride) throw new Error("Ride not found!!!");
      return ride;
    } catch (error) {
      throw new Error(`Error occured: ${error}`);
    }
}

export async function startRide({
  rideId,
  otp,
  captain,
}: {
  rideId: string;
  otp: string;
  captain: ICaptain;
}) {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required!!!");
  }
  try {
    const ride = await Ride.findById(rideId)
      .populate("user")
      .populate("captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Ride not found!!!");
    }
  
    if (ride.status !== "accepted") {
      throw new Error("Ride is not in 'accepted' status!!!");
    }
  
    if (ride.otp !== otp) {
      throw new Error("Invalid OTP!!!");
      }
      
    ride.status = "ongoing";
    await ride.save();
  
    return ride;
  } catch (error) {
    throw new Error(`Error occured: ${error}`);
  }
}


export async function endRide({
  rideId,
  captain,
}: {
  rideId: string;
  captain: ICaptain;
}) {
  if (!rideId) {
    throw new Error("Ride ID is required!!!");
  }

  try {
    const ride = await Ride.findOne({
      _id: rideId,
      captain: captain._id,
    })
      .populate("user")
      .populate("captain")
      .select("+otp");
  
    if (!ride) {
      throw new Error("Ride not found!!!");
    }
  
    if (ride.status !== "ongoing") {
      throw new Error("Ride is not in 'ongoing' status!!!");
    }
  
    ride.status = "completed";
    await ride.save();
  
    return ride;
  } catch (error) {
    throw new Error(`Error occured: ${error}`);
  }
}
