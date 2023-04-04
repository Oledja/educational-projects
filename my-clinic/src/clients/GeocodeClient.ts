import * as dotenv from "dotenv";
import NodeGeocoder, { GoogleOptions } from "node-geocoder";
import { GeocodeResponse } from "../interfaces/GeocodeResponse";
dotenv.config();

const key = process.env.GEOCODE_API_KEY;
const url = process.env.GEOCODE_API_URL;

const options: GoogleOptions = {
  provider: "google",
  apiKey: key,
};

const geocoder = NodeGeocoder(options);

export const getPosition = async (
  address: string
): Promise<GeocodeResponse> => {
  const response = await geocoder.geocode(address);
  return response[0];
};
