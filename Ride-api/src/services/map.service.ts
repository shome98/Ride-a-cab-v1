import axios from "axios";
import { Captain } from "../models/captain.model";

export interface Prediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: { offset: number; value: string }[];
  types: string[];
}

export const getAddressCoordinates=async(address:string)=>{
    const apiKey=process.env.GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response=await axios.get(url);
        if(response.data.status==="OK"){
            const location=response.data.results[ 0 ].geometry.location;
            return {latitude:location.lat,longitude:location.lng};
        }
        else{
            throw new Error("Unable to fetch coordinates.");
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

export const getDistanceTime = async (origin:string, destination:string) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAutoCompleteSuggestions = async (input:string) => {
    if (!input) {
        throw new Error('query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions
                .map((prediction: Prediction) => prediction.description)
                .filter((value: string) => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCaptainsInTheRadius=async(latitude:number,longitude:number,radius:number)=>{
    try {
        const captains=await Captain.find({
            location:{
                $geoWithin:{
                    $centreSphere:[[latitude,longitude],radius/6371],
                }
            }
        });
        return captains;
    } catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
}