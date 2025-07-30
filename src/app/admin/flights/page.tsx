"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { type TFlight } from "@/app/utils/types";

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://flight-server-six.vercel.app/api/flights"
      );
      const data = await res.json();
      setFlights(data.data.flights);
    };
    fetchData();
  }, []);

  const handleDeleteFlight = async (id: string) => {
    const res = await fetch(
      `https://flight-server-six.vercel.app/api/flights/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    if (data.ok) {
      toast.success(data.message || "Deleted succesfully");
      setFlights(flights.filter((s: TFlight) => s._id != id));
    } else {
      toast.error(data.message || "Something went wrong while deleting.");
    }
  };
  return (
    <div className="max-w-7xl mx-auto my-12 overflow-hidden">
      <Link
        href="/admin/flights/add"
        className="border border-blue-800 px-3 py-2 text-blue-800 rounded mt-2 block max-w-[100px] text-center transition-all hover:bg-blue-800 hover:text-white"
      >
        Add Flight
      </Link>
      <div className="overflow-hidden mt-4 w-full rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Airline
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Dest.
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white"></tbody>
          <tbody>
            {flights.map((flight: TFlight) => (
              <tr key={flight._id}>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {flight.airline} <br />
                  <p className="text-xs">{flight.flight_number}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex text-xs items-center gap-2">
                    <FaPlaneDeparture className="text-black/80" />
                    <span> {flight.origin}</span>
                  </div>

                  <div className="flex  text-xs  items-center gap-2">
                    <FaPlaneArrival className="text-black/80" />
                    <span> {flight.destination}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-800">
                  {flight.date} <br />
                  {flight.time}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <Link
                    href={`/admin/flights/update/${flight._id}`}
                    className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700 transition mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteFlight(flight._id)}
                    className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
