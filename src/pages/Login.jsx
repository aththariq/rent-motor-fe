import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    // handle form submission
  };

  return (
    <div>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden lg:block lg:w-3/5 bg-cover bg-black bg-opacity-50 bg-blend-darken"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/3599586/pexels-photo-3599586.jpeg')`,
            }}
          >
            <div className="flex items-center h-full px-20 text-white">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Motoran</h2>
                <p className="max-w-xl mt-3">
                  Motoran, layanan sewa motor digital yang praktis, cepat, dan
                  aman. Pilih, pesan, dan nikmati transportasi tanpa ribet kapan
                  saja! 🚀
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-left mx-auto h-11 mb-5">
                  <img
                    className="w-auto h-16 sm:h-16"
                    src="/favicon.svg"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-gray-500 text-left">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      {...register("email")}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mt-6 relative">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      {...register("password")}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-10 text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-primary-dark rounded-lg hover:bg-secondary focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="text-primary-dark focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
