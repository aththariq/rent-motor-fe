import React from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Kepercayaan Anda, Prestasi Kami!
          </h2>
          <p className="mt-4 text-gray-500 sm:text-xl">
            Dengan komitmen penuh, kami hadir untuk memenuhi kebutuhan mobilitas Anda dengan solusi cepat, mudah, dan terpercaya.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Jumlah Kepuasan */}
          <div className="flex flex-col rounded-lg bg-primary-extra px-4 py-8 text-center">
            <dt className="text-base font-bold text-gray-600">Jumlah Kepuasan</dt>
            <dd className="text-5xl font-extrabold text-primary-dark md:text-6xl">
              <CountUp start={9951} end={10051} duration={2.5} separator="." />
            </dd>
            <span className="mt-2 text-sm text-gray-500">Pelanggan puas.</span>
          </div>

          {/* Rating */}
          <div className="flex flex-col rounded-lg bg-primary-extra px-4 py-8 text-center">
            <dt className="text-base font-bold text-gray-600">Rating</dt>
            <dd className="text-5xl font-extrabold text-primary-dark md:text-6xl">
              <CountUp start={0} end={4.5} duration={2.5} decimals={1} />
              <strong className="text-3xl font-extrabold text-primary md:text-3xl"> /5 </strong>
            </dd>
            <span className="mt-2 text-sm text-gray-500">Bintang di Google.</span>
          </div>

          {/* Transaksi */}
          <div className="flex flex-col rounded-lg bg-primary-extra px-4 py-8 text-center">
            <dt className="text-base font-bold text-gray-600">Transaksi</dt>
            <dd className="text-5xl font-extrabold text-primary-dark md:text-6xl">
              <CountUp start={502900} end={503000} duration={2.5} separator="." />
            </dd>
            <span className="mt-2 text-sm text-gray-500">Transaksi sukses.</span>
          </div>

          {/* Ketersediaan Layanan */}
          <div className="flex flex-col rounded-lg bg-primary-extra px-4 py-8 text-center">
            <dt className="text-base font-bold text-gray-600">Ketersediaan Layanan</dt>
            <dd className="text-5xl font-extrabold text-primary-dark md:text-6xl">
              <CountUp start={10} end={24} duration={2.5} />
              <strong className="text-3xl font-extrabold text-primary md:text-3xl"> /7 </strong>
            </dd>
            <span className="mt-2 text-sm text-gray-500">Siap melayani Anda.</span>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Statistics;
