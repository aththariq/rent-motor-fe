import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";

// Validation Schema
const schema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email wajib diisi")
    .matches(/^[^\s@]+@[^\s@]+\.(com|org|net|ac\.id|co\.uk)$/, "Email tidak valid"),
  password: Yup.string().required("Password wajib diisi").min(8, "Password minimal 8 karakter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://api-motoran.faizath.com/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Registrasi berhasil! Selamat datang!");
      console.log(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat registrasi"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div>
          <label>Nama</label>
          <input
            type="text"
            {...register("name")}
            className={`block w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mt-4">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className={`block w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mt-4 relative">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`block w-full p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute top-8 right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="mt-4 relative">
          <label>Konfirmasi Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`block w-full p-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute top-8 right-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
          </button>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded">
          Buat Akun
        </button>
      </form>
    </div>
  );
};

export default Signup;
