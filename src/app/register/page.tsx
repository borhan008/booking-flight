"use client";

import React, { useEffect } from "react";
import H2 from "../components/heading";

import { FieldValues, useForm, SubmitErrorHandler } from "react-hook-form";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContext } from "../utils/AuthProvider";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
  name: string;
  phone: number;
  gender: "Male" | "Female";
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm();
  const { setName, setUser } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/flights");
    }
  }, []);

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await fetch(
        "https://flight-server-six.vercel.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (!res.ok || !result.data.token) {
        throw new Error(result.message);
      }
      toast.success("Registration completed");
      setName(data.name);
      setUser(true);
      localStorage.setItem("token", result.data.token);
      router.push("/flights/");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        toast.error((err as { message: string }).message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onError: SubmitErrorHandler<FormValues> = async (errors) => {
    toast.error(
      errors?.email?.message ||
        errors?.password?.message ||
        errors?.name?.message ||
        errors?.phone?.message ||
        errors?.gender?.message ||
        "Something went wrong"
    );
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col md:flex-row items-center justify-center">
      <ToastContainer />
      <div className="h-min-[100vh] max-w-[350px] lg:max-w-full">
        <img src="/authenetication.jpg" alt="Image" className="w-full" />
      </div>
      <div className=" bg-blue-800  py-8 md:min-h-[100vh]    w-full  flex items-center flex-col gap-4 justify-center ">
        <H2>Register Now</H2>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          method="post"
          className="w-full text-center flex flex-col items-center gap-y-4"
        >
          <input
            {...register("name", {
              required: "The name is required",
            })}
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full max-w-[400px] p-3 placeholder-black/40  rounded-full bg-white border border-white/20 text-black/70  shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
          />
          <input
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            name="email"
            placeholder="Enter your email"
            className="w-full max-w-[400px] p-3 placeholder-black/40  rounded-full bg-white border border-white/20 text-black/70  shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
          />

          <input
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full max-w-[400px] p-3 rounded-full bg-white border border-white/20 text-black/70 placeholder-black/40 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
          />
          <input
            {...register("phone", {
              required: "The phone is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must contain only digits",
              },
            })}
            type="text"
            name="phone"
            placeholder="Enter your phone"
            className="w-full max-w-[400px] p-3 rounded-full bg-white border border-white/20 text-black/70 placeholder-black/40 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
          />
          <select
            id="gender"
            {...register("gender", { required: "Please select a gender" })}
            className="w-full max-w-[400px] p-3 rounded-full bg-white border border-white/20 text-black/70 placeholder-black/40 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
            defaultValue=""
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 w-full max-w-[120px] rounded-full text-white text-black/70 border border-white hover:bg-white hover:text-blue-800 font-bold transition-all duration-200 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-20"
          >
            {" "}
            Register{" "}
          </button>
        </form>

        <p className="text-sm">
          Have an account?{" "}
          <Link href="login" className="underline">
            Login Now!
          </Link>
        </p>
      </div>
    </div>
  );
}
