"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaSearchLocation } from "react-icons/fa";
import SingleFlight from "../components/singleFlight";
import { type TFlight } from "../utils/types";

export default function Flights() {
  const { handleSubmit, register } = useForm();
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://flight-server-six.vercel.app/api/flights"
      );
      const data = await res.json();
      if (data.data.flights) setFlights(data.data.flights);
    };
    fetchData();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    const res = await fetch(
      `https://flight-server-six.vercel.app/api/flights/search?origin=${data.origin}&destination=${data.destination}`
    );
    const filteredData = await res.json();
    if (filteredData.data.flights) setFlights(filteredData.data.flights);
  };

  return (
    <main className="min-h-screen  ">
      <section className="max-w-7xl mx-auto py-16">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-800">
          All Flights
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="w-full py-3 flex flex-wrap gap-4 items-center justify-center  max-w-6xl my-5 mx-auto p-6 bg-white/5 backdrop-blur-md rounded-xl shadow-md "
        >
          <input
            type="text"
            {...register("origin")}
            className=" flex-1 basis-80  w-full  p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
            placeholder="Origin"
          />
          <input
            type="text"
            {...register("destination")}
            className=" flex-1 basis-80  w-full  p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
            placeholder="Destination"
          />

          <button className="bg-blue-800 w-10 h-10 rounded-full text-center flex items-center justify-center">
            <FaSearchLocation />
          </button>
        </form>

        <div className="flex flex-wrap gap-y-5 gap-x-4 justify-center w-full">
          {flights &&
            flights.map((flight: TFlight) => (
              <SingleFlight flight={flight} key={flight._id} />
            ))}
        </div>
      </section>
    </main>
  );
}
