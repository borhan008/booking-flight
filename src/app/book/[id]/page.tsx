"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaChair,
} from "react-icons/fa";
import { toast } from "react-toastify";

type TSeat = {
  _id: string;
  flightId: string;
  seatNumber: string;
  isBooked: boolean;
  bookedBy: string | null;
};
type TFlight = {
  _id: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  seats: TSeat[];
};

export default function BookASeat() {
  const { id } = useParams();

  const [countDown, setCountDown] = useState(false);
  const [counting, setCounting] = useState(0);
  const [flight, setFlight] = useState<TFlight | null>(null);

  const [seatBookingsIds, setSeatBookingsIds] = useState<String[]>([]);

  useEffect(() => {
    const fetchFlight = async () => {
      const res = await fetch(
        `https://flight-server-six.vercel.app/api/flights/${id}`
      );
      const data = await res.json();
      setFlight({ ...data.data.flight, seats: data.data.seats });
      console.log(data);
    };
    fetchFlight();
  }, []);

  const handleAddSeat = (seatID: String) => {
    if (seatBookingsIds.includes(seatID)) {
      setSeatBookingsIds(seatBookingsIds.filter((s) => s !== seatID));
    } else {
      setSeatBookingsIds([...seatBookingsIds, seatID]);
    }
  };

  const handleBookNow = async () => {
    try {
      const seatBook = await fetch(
        `https://flight-server-six.vercel.app/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            flightId: flight?._id,
            seatIds: seatBookingsIds,
          }),
        }
      );

      const seatBookData = await seatBook.json();
      if (seatBookData.ok) {
        toast.success("Seat booked, wait 2 mins for confirmation.");
        setCountDown(true);
        setCounting(120);
      } else {
        toast.error(
          seatBookData.message || "Something went wrong while booking the seat."
        );
        if (seatBookData.message === "jwt expired") {
          toast.error("Loggging you out.");
          localStorage.removeItem("token");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message || "Something went wrong while booking the seat."
      );
    }
  };

  const handleConfirmSeat = async () => {
    const seatBook = await fetch(
      `https://flight-server-six.vercel.app/api/bookings/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          flightId: flight?._id,
          seatIds: seatBookingsIds,
        }),
      }
    );
    const seatBookData = await seatBook.json();
    if (seatBookData.ok) {
      toast.success("Seat confiemd");
    } else {
      toast.error("Something went wrong while confirming the seat.");
    }
  };

  useEffect(() => {
    if (counting == 0) return;
    setTimeout(() => {
      setCounting(counting - 1);
    }, 1000);
  }, [counting]);

  return (
    <main className="min-h-screen  ">
      {countDown ? (
        <section className="max-w-xl mx-auto py-16  ">
          <div className="bg-white rounded-xl shadow-md max-w-lg w-full overflow-hidden py-12 border">
            {counting && (
              <h2 className="text-black/80 text-2xl text-center mb-4">
                Please wait {counting}s to confirm
              </h2>
            )}
            {counting == 0 && (
              <button
                className="border border-blue-800 text-center- w-[80%] mx-auto text-center p-2 rounded-full block text-blue-800 hover:bg-blue-800 hover:text-white transition"
                onClick={handleConfirmSeat}
              >
                Confirm Seats
              </button>
            )}
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto py-16">
          <div className="flex flex-wrap gap-y-5 gap-x-4 justify-center w-full">
            {flight && (
              <div className="bg-white rounded-xl shadow-md max-w-lg w-full overflow-hidden pb-4">
                <div className="bg-blue-800 text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg m-0 p-0 font-semibold">
                      {flight.airline}
                    </h3>

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
                      <span>
                        {" "}
                        {Math.max(1, seatBookingsIds.length) * flight.price}
                      </span>
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

                  <div className="flex flex-wrap gap-4 my-2">
                    {flight.seats &&
                      flight.seats.map((singleFlight: TSeat) => (
                        <div
                          key={singleFlight.seatNumber}
                          className="flex-1 min-h-10 min-w-10 "
                        >
                          {singleFlight.isBooked ? (
                            <div
                              className={`w-full  min-h-10 transition rounded-full flex justify-center items-center text-black border border-black text-black opacity-20`}
                            >
                              {singleFlight.seatNumber}
                            </div>
                          ) : (
                            <div
                              className={`w-full  min-h-10 transition rounded-full flex justify-center items-center text-black border border-black text-black hover:bg-blue-800 hover:text-white ${
                                seatBookingsIds.includes(singleFlight._id)
                                  ? "bg-blue-800 text-white"
                                  : ""
                              }`}
                              onClick={() => handleAddSeat(singleFlight._id)}
                            >
                              {singleFlight.seatNumber}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <button
                  className="border border-blue-800 text-center- w-[80%] mx-auto text-center p-2 rounded-full block text-blue-800 hover:bg-blue-800 hover:text-white transition"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
