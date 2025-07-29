import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaChair,
  FaSearchLocation,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";
import React from "react";
import { type TFlight } from "../utils/types";
export default function SingleFlight({ flight }: { flight: TFlight }) {
  return (
    <div
      key={flight._id}
      className="bg-white rounded-xl shadow-md max-w-[250px] w-full overflow-hidden pb-4"
    >
      <div className="bg-blue-800 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg m-0 p-0 font-semibold">{flight.airline}</h3>

          <div className="flex text-xs items-center gap-2">
            <FaPlaneDeparture className="text-white" />
            <span> {flight.origin}</span>
          </div>

          <div className="flex  text-xs  items-center gap-2">
            <FaPlaneArrival className="text-white" />
            <span> {flight.destination}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-xs text-right font-light">
            {flight.flight_number}
          </p>

          <div className="flex items-center gap-1 text-xl">
            <FaDollarSign className="text-white-800" />
            <span> {flight.price}</span>
          </div>
        </div>
      </div>

      <div className="p-6  flex flex-col gap-1 text-sm text-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-800" />
            <span>{flight.date}</span>
            <span> {flight.time}</span>
          </div>
        </div>
      </div>

      <Link
        href={`book/${flight._id}`}
        className="border border-blue-800 text-center- w-[80%] mx-auto text-center p-2 rounded-full block text-blue-800 hover:bg-blue-800 hover:text-white transition"
      >
        Book Now
      </Link>
    </div>
  );
}
