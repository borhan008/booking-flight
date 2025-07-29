import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans bg-blue-900 flex flex-col gap-2 items-center justify-items-center min-h-[100vh] p-8 pb-20 gap-16 sm:p-20 text-white text-center">
      <h1 className="text-6xl font-extrabold tracking-wide">FlyBook</h1>

      <p className="text-xl max-w-xl font-light ">
        A flight management system.
      </p>

      <ul className="space-y-3 max-w-md text-left">
        <li>✈️ Flight Listing</li>
        <li>🔍 Filter Flights</li>
        <li>🛒 Booking</li>
        <li>✅ Confirm Booking</li>
        <li>🛠️ Admin Panel</li>
      </ul>
    </div>
  );
}
