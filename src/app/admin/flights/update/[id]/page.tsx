"use client";
import { convertTo24Hour } from "@/app/utils/utils";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  seats: string;
};
export default function UpdateFlight() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://flight-server-six.vercel.app/api/flights/${id}`
      );
      const data = await res.json();
      reset({
        ...data.data.flight,
        date: new Date(data.data.flight.date).toISOString().split("T")[0],
        time: convertTo24Hour(data.data.flight.time),
        seats: data.data.seats
          .map((s: { seatNumber: string }) => s.seatNumber)
          .join(", "),
      });
    };
    fetchData();
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    data.seats = data.seats.split(",").map((seat: string) => seat.trim());

    data.price = Number(data.price);
    const res = await fetch(
      `https://flight-server-six.vercel.app/api/flights/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    const newData = await res.json();
    if (newData.ok) {
      toast.success("Successfully updated");
      reset();
    } else {
      toast.error(
        newData?.message || "Something went wrong while updating flight."
      );
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    Object.entries(errors).map(([field, error]) => {
      if (error?.message) {
        toast.error(error.message, {
          toastId: field,
        });
      }
    });
  };

  return (
    <div className="space-y-4 max-w-6xl py-12 mx-auto p-6 bg-white/5 backdrop-blur-md rounded-xl shadow-md border border-black/20 my-8">
      <h2 className="text-black/80 text-2xl pb-4">Update a Flight</h2>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        method="post"
        className="flex flex-wrap  gap-4 "
      >
        <input
          {...register("airline", {
            required: "Airline is required",
          })}
          type="text"
          name="airline"
          placeholder="Airline"
          className=" flex-1 basis-80  w-full  p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("flight_number", {
            required: "Flight Number is required",
          })}
          type="text"
          name="flight_number"
          placeholder="Flight Number"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("origin", {
            required: "origin is required",
          })}
          type="text"
          name="origin"
          placeholder="Origin"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("destination", {
            required: "destination is required",
          })}
          type="text"
          name="destination"
          placeholder="Destination"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("date", {
            required: "date is required",
          })}
          type="date"
          name="date"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("time", {
            required: "time is required",
          })}
          type="time"
          name="time"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          type="number"
          name="price"
          placeholder="Price"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <input
          {...register("seats", {
            required: "Seats are required",
          })}
          type="text"
          name="seats"
          placeholder="Seats (comma separated e.g. 1A,1B,1C)"
          className="w-full flex-1 basis-80   p-3 placeholder-black/70 rounded-full bg-white border border-black/20 text-black/70 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-black/70 transition-all"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="max-w-[300px] w-full h-13 rounded-full border-2 border-blue-800 text-blue-800 shadow-md hover:bg-blue-800 hover:text-white transition-all disabled:opacity-20"
        >
          {isSubmitting ? "Loading" : "Update"}
        </button>
      </form>
    </div>
  );
}
