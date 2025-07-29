"use client";
import Link from "next/link";
import React from "react";
import { useAuthContext } from "../utils/AuthProvider";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, setUser, name, setName } = useAuthContext();
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0;";
    localStorage.removeItem("token");
    setUser(false);
    setName("");
    router.push("/login");
  };
  return (
    <div className="pb-2 border-b border-blue-800">
      <header className="flex flex-col md:flex-row justify-between items-center min-h-16 max-w-6xl mx-auto">
        <Link
          className="text-3xl text-blue-800 font-bold tracking-wide"
          href="/"
        >
          <h1>FlyBook</h1>
        </Link>
        <nav>
          <ul className="flex gap-4 text-sm font-medium text-black/60">
            {!user && (
              <React.Fragment>
                <li>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className=" hover:underline">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}

            <li>
              <Link href="/flights" className="hover:underline">
                Flights
              </Link>
            </li>
            {user && (
              <React.Fragment>
                <li>
                  <Link href="/admin/flights" className="hover:underline">
                    Flights Management
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/admin/book" className="hover:underline">
                    Booking Management
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
