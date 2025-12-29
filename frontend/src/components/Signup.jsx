import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Login from "./Login";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    // Here you will eventually call your backend: axios.post('/api/users/signup', data)
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="modal-box dark:bg-slate-900 dark:text-white border shadow-xl rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close Button */}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => navigate("/")} 
            >
              ✕
            </button>

            <h3 className="font-bold text-2xl text-center text-pink-500">Create KitUp Account</h3>
            <p className="text-center text-sm mb-6 text-gray-500">One account to Buy, Sell, and Share</p>

            {/* Full Name */}
            <div className="mt-4 space-y-1">
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800"
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="mt-4 space-y-1">
              <label className="text-sm font-semibold">Email ID</label>
              <input
                type="email"
                placeholder="Enter your college email"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>

            {/* Mobile Number */}
            <div className="mt-4 space-y-1">
              <label className="text-sm font-semibold">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter 10 digit mobile number"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800"
                {...register("mobile", { 
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number (10 digits required)"
                  }
                })}
              />
              {errors.mobile && <span className="text-xs text-red-500">{errors.mobile.message}</span>}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-1">
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-800"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button className="w-full bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 transition duration-300 font-bold">
                Signup
              </button>
            </div>

            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500 cursor-pointer font-medium"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Login />
    </div>
  );
}

export default Signup;