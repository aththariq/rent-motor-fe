import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";

// Validation Schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.(com|org|net|ac\.id|co\.uk)$/, "Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger, // Trigger validation manually for real-time feedback
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Real-time validation on change
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email Address <strong className="text-red-500">*</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              {...register("email")}
              className={`w-full px-4 py-2 mt-1 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              onBlur={() => trigger("email")} // Trigger validation on blur
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password <strong className="text-red-500">*</strong>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your password"
              {...register("password")}
              className={`w-full px-4 py-2 mt-1 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              onBlur={() => trigger("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-600"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600" htmlFor="confirmPassword">
              Confirm Password <strong className="text-red-500">*</strong>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`w-full px-4 py-2 mt-1 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              onBlur={() => trigger("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-9 right-3 text-gray-600"
            >
              {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid} // Disable submit if form is invalid
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
