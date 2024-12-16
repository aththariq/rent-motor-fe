import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/motoran.svg";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-4xl my-10">
        <div className="absolute inset-0 -translate-y-4 bg-white shadow-lg rounded-lg"></div>

        <section className="relative bg-white shadow-md rounded-lg">
          <div className="p-8 sm:p-12 lg:px-16">
            {/* Logo */}
            <div className="flex justify-center">
              <img src={logo} alt="Motoran Logo" className="h-16 w-16" />
            </div>

            {/* Judul */}
            <h1 className="mt-6 text-2xl font-bold text-center text-gray-900 sm:text-3xl">
              Selamat datang di Motoran!
            </h1>
            <p className="mt-4 text-center text-gray-500">
              Silahkan Registrasi untuk melakukan penyewaan motor.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
                {/* Nama Lengkap */}
                <div className="col-span-6">
                    <label htmlFor="NamaLengkap" className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                    <strong className="text-red-500"> *</strong>
                    </label>
                    <input
                    type="text"
                    id="NamaLengkap"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm pl-4 pr-4 pt-3 pb-3"
                    {...register('namaLengkap', { required: 'Nama Lengkap wajib diisi' })}
                    />
                    {errors.namaLengkap && <p className="text-red-500 text-sm">{errors.namaLengkap.message}</p>}
                </div>

                {/* Email */}
                <div className="col-span-6">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Email
                    <strong className="text-red-500"> *</strong>
                    </label>
                    <input
                    type="email"
                    id="Email"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm pl-4 pr-4 pt-3 pb-3"
                    {...register("email", {
                        required: "Email wajib diisi",
                        pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|ac\.id|co\.uk)$/,
                        message: "Format email harus valid dan diakhiri .com, .org, .net, .ac.id, atau .co.uk",
                        },
                    })}
                    onBlur={() => trigger("email")} // Validasi langsung saat keluar input
                    />
                    {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="col-span-6 sm:col-span-3 relative">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                    <strong className="text-red-500"> *</strong>
                    </label>
                    <input
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm pl-4 pr-10 pt-3 pb-3"
                    {...register("password", {
                        required: "Password wajib diisi",
                        minLength: {
                        value: 8,
                        message: "Password minimal 8 karakter",
                        },
                    })}
                    onBlur={() => trigger("password")}
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-500"
                    >
                    {showPassword ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                        </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        </svg>
                    )}
                    </button>
                    {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Konfirmasi Password */}
                <div className="col-span-6 sm:col-span-3 relative">
                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Konfirmasi Password
                    <strong className="text-red-500"> *</strong>
                    </label>
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="PasswordConfirmation"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm pl-4 pr-10 pt-3 pb-3"
                    {...register("passwordConfirmation", {
                        required: "Konfirmasi password wajib diisi",
                        validate: (value) =>
                        value === password || "Konfirmasi password harus sama dengan password",
                    })}
                    onBlur={() => trigger("passwordConfirmation")}
                    />
                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-10 text-gray-500"
                    >
                    {showPassword ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                        </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        </svg>
                    )}
                    </button>
                    {errors.passwordConfirmation && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.passwordConfirmation.message}
                    </p>
                    )}
                </div>

                <div className="col-span-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
                    <button
                        className="inline-block shrink-0 rounded-md border border-primary-dark bg-primary-dark px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                        Buat Akun
                    </button>

                    <p className="text-sm text-gray-500 text-center sm:text-left">
                        Sudah punya akun?{" "}
                        <a href="#" className="text-gray-700 underline">
                        Masuk
                        </a>
                    </p>
                </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
