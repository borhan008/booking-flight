import Link from 'next/link';
import React from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaClock, FaDollarSign, FaChair } from "react-icons/fa";

export default function Flights() {
  const flight = {
    airline: "Airways",
    flight_number: "AW123",
    origin: "New York",
    destination: "London",
    date: "2024-12-01",
    time: "10:00 AM",
    price: 500,
    seats: ["1A", "1B", "1C", "2A", "2B"],
  };

  return (
    <main className="min-h-screen  ">

      <div className="border-b border-blue-800">
      <header className="flex justify-between items-center min-h-16 max-w-6xl mx-auto">

        <h1 className="text-3xl text-blue-800 font-bold tracking-wide">FlyBook</h1>
        <nav>
          <ul className="flex gap-4 text-sm font-medium text-black/60">
            <li>
              <Link href="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link href="/register" className=" hover:underline">Register</Link>
            </li>
            <li>
              <Link href="/flight/add" className="hover:underline">Add Flight</Link>
            </li>
          </ul>
        </nav>
      </header>
      </div>

      {/* Flight Section */}
      <section className='max-w-7xl mx-auto py-16'>
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-800">All Flights</h2>

        <div className="flex flex-wrap gap-y-5 gap-x-4 justify-center w-full">
            <div className="bg-white rounded-xl shadow-md max-w-[250px] w-full overflow-hidden pb-4">
                

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
                    <div className='flex flex-col justify-center items-center text-center'>

                    <p className="text-xs text-right font-light">{flight.flight_number}</p>

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
           

                <Link href="" className='border border-blue-800 text-center- w-[80%] mx-auto text-center p-2 rounded-full block text-blue-800 hover:bg-blue-800 hover:text-white transition'>Book Now</Link>
            </div>
          
        </div>
      </section>
    </main>
  );
}
