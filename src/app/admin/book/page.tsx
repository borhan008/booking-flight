"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type TSeat = {
  _id: string;
  flightId: string;
  seatNumber: string;
  isBooked: boolean;
  bookedBy: string;
  reservedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TBooking = {
  _id: string;
  userId: string;
  flightId: TFlight;
  numberOfSeats: number;
  totalPrice: number;
  bookingStatus: "Pending" | "Confirmed" | "Cancelled";
  seatsBooked: TSeat[];
  paymentStatus: "Paid" | "Unpaid" | "Refunded";
  cancellationDate: string | null;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function BookingList() {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [selectedSeats, setSelectedSeat] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://flight-server-six.vercel.app/api/bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const bookingsData = await res.json();
      if (!bookingsData.ok) {
        toast.error(bookingsData.message || "Something went wrong");
      }
      setBookings(bookingsData.data);
    };
    fetchData();
  }, []);

  const [selectedBookId, setSelectedBookId] = useState("");
  const [seats, setSeats] = useState([]);

  const handleDelteBooking = async (_id: string) => {
    const res = await fetch(
      `https://flight-server-six.vercel.app/api/bookings/${_id}`,
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
      setBookings(bookings.filter((b) => b._id != _id));
      toast.success(data.message || "Deleted successfully.");
    } else {
      toast.error(data.message || "Something went wrong successfully.");
    }
  };

  const setUpdatedId = async (bookId: string) => {
    setSeats([]);
    const flightId = bookings.filter((s) => s._id === bookId)[0].flightId;
    if (!flightId || !flightId._id) {
      toast.error("No data found.");
      return;
    }
    const res = await fetch(
      `https://flight-server-six.vercel.app/api/flights/${flightId._id}`
    );
    const data = await res.json();
    if (data.ok) {
      setSeats(data.data.seats);
      setSelectedBookId(bookId);
      setSelectedSeat(
        bookings
          .filter((s) => s._id === bookId)[0]
          .seatsBooked.map((s) => s.seatNumber)
      );
    } else {
      toast.error(data.message || "No data found.");
    }
  };

  const handleUpdateSeatNumbers = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeat(selectedSeats.filter((seat) => seat != seatNumber));
    } else {
      setSelectedSeat([...selectedSeats, seatNumber]);
    }
  };

  const handleUpdateBooking = async (_id: string) => {
    const res = await fetch(
      `https://flight-server-six.vercel.app/api/bookings/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          newSeatNumbers: selectedSeats,
        }),
      }
    );
    const data = await res.json();
    if (data.ok) {
      toast.success(data.message || "Updated");
    } else {
      toast.error(data.message || "Something went wrong while updating.");
    }
  };
  return (
    <div className="max-w-7xl mx-auto my-12 overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Booking ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Seats
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Flight
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {bookings &&
            bookings.map((booking) => (
              <React.Fragment key={booking._id}>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {booking._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {booking.numberOfSeats}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {booking?.flightId?.flight_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 space-x-2">
                    <button
                      className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700 transition"
                      onClick={() => setUpdatedId(booking._id)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelteBooking(booking._id)}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {selectedBookId === booking._id && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-3">
                      <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                        {seats.length > 0 ? (
                          seats.map((seat: TSeat, idx) => (
                            <span
                              key={idx}
                              className={`inline-block cursor-pointer px-2 py-1 rounded-full bg-blue-100 text-blue-800 ${
                                selectedSeats.includes(seat.seatNumber) &&
                                "bg-blue-800 text-white"
                              }`}
                              onClick={() =>
                                handleUpdateSeatNumbers(seat.seatNumber)
                              }
                            >
                              {seat.seatNumber}
                            </span>
                          ))
                        ) : (
                          <span>No seats selected.</span>
                        )}
                      </div>
                      {seats.length > 0 && (
                        <button
                          className="border text-xs float-left mt-3 cursor-pointer border-blue-800  mx-auto text-center px-2 rounded-full block text-blue-800 hover:bg-blue-800 hover:text-white transition"
                          onClick={() => handleUpdateBooking(booking._id)}
                        >
                          Save Seat
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
