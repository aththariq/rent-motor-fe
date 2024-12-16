import React from "react";

const WhatWeOffer = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="lg:w-3/4 my-auto">
          <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl ">
            Kemudahan dan Kenyamanan dalam Menyewa Motor
          </h2>
          <p className="mt-3 text-gray-800 dark:text-neutral-400 text-justify">
            Kami menawarkan solusi praktis bagi Anda yang membutuhkan kendaraan
            cepat dan andal. Dengan berbagai pilihan motor yang terawat, proses
            sewa yang mudah, dan layanan pelanggan yang ramah, kami memastikan
            pengalaman berkendara Anda menjadi lebih nyaman dan menyenangkan.
          </p>
          <p className="mt-5">
            <a
              className="inline-flex items-center gap-x-1 text-sm text-primary-dark decoration-2 hover:underline focus:outline-none focus:underline font-medium"
              href="#"
            >
              Hubungi kami untuk informasi lebih lanjut
              <svg
                className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1 "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </p>
        </div>
        {/* End Left Column */}

        {/* Right Column */}
        <div className="space-y-6 lg:space-y-10">
          {/* Icon Block 1 */}
          <div className="flex gap-x-5 sm:gap-x-8">
            <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <div className="grow">
              <h3 className="text-base sm:text-lg font-semibold text-secondary">
                Layanan Online 24/7
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400 text-justify mr-5">
                Kami hadir untuk memberikan kemudahan akses ke layanan sewa
                motor kapan saja dan di mana saja. Dengan sistem pemesanan
                online yang tersedia 24/7, Anda dapat memilih motor sesuai
                kebutuhan Anda tanpa batasan waktu.
              </p>
            </div>
          </div>
          {/* End Icon Block 1 */}

          {/* Icon Block 2 */}
          <div className="flex gap-x-5 sm:gap-x-8">
            <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
              <svg
                className="shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </span>
            <div className="grow">
              <h3 className="text-base sm:text-lg font-semibold text-secondary">
                Dukungan Pelanggan Profesional
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400 text-justify mr-5">
                Tim kami siap membantu Anda setiap saat. Baik melalui live chat,
                email, atau telepon, kami berkomitmen memberikan dukungan
                terbaik untuk memastikan pengalaman Anda menyewa motor berjalan
                lancar.
              </p>
            </div>
          </div>
          {/* End Icon Block 2 */}

          {/* Icon Block 3 */}
          <div className="flex gap-x-5 sm:gap-x-8">
            <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
              <svg
                className="shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
            </span>
            <div className="grow">
              <h3 className="text-base sm:text-lg font-semibold text-secondary">
                Mudah dan Terjangkau
              </h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400 text-justify mr-5">
                Nikmati kemudahan penyewaan motor dengan proses yang cepat,
                harga yang kompetitif, dan berbagai pilihan motor untuk
                kebutuhan perjalanan Anda.
              </p>
            </div>
          </div>
          {/* End Icon Block 3 */}
        </div>
        {/* End Right Column */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default WhatWeOffer;
