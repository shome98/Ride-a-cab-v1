import { getDistanceTime } from "./map.service";
import crypto from "crypto";

export async function calculateFare(pickup:string,destination:string){
    if(!pickup || !destination) throw new Error("Pick and destination both are required ");
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
    return {};
}

export function generateOtp(num:number) {
    const otp: string = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
