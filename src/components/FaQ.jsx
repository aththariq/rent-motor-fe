import { motion } from 'framer-motion'; // Added import

const FaQ = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-4 space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.3, once: true }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-gray-900 text-center">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        <motion.details
          className="group [&_summary::-webkit-details-marker]:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Bagaimana cara menyewa motor di sini?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Anda cukup mengunjungi website kami, pilih motor yang sesuai dengan
            kebutuhan Anda, isi formulir pemesanan, dan konfirmasi pembayaran.
            Setelah itu, motor akan siap Anda gunakan.
          </p>
        </motion.details>

        <motion.details
          className="group [&_summary::-webkit-details-marker]:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Apa saja persyaratan untuk menyewa motor?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Persyaratan utama adalah: <br />- KTP asli yang masih berlaku.{" "}
            <br />- SIM C yang sah. <br />- Deposit (kendaraan tertentu). <br />
            Persyaratan tambahan dapat dilihat di halaman syarat dan ketentuan
            kami.
          </p>
        </motion.details>
        <motion.details
          className="group [&_summary::-webkit-details-marker]:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Apakah tersedia layanan antar-jemput motor?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Ya, kami menyediakan layanan antar-jemput motor dengan biaya
            tambahan. Anda dapat memilih lokasi antar-jemput saat melakukan
            pemesanan.
          </p>
        </motion.details>

        <motion.details
          className="group [&_summary::-webkit-details-marker]:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Apakah motor yang disewa sudah termasuk bensin?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Motor disediakan dengan bensin minimal 1 liter. Anda diharapkan
            mengisi ulang bahan bakar sesuai kebutuhan selama masa sewa.
          </p>
        </motion.details>

        <motion.details
          className="group [&_summary::-webkit-details-marker]:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Berapa lama durasi sewa yang tersedia?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Kami menyediakan beberapa pilihan durasi sewa, mulai dari harian,
            mingguan, hingga bulanan. Anda dapat memilih durasi yang sesuai
            dengan kebutuhan Anda.
          </p>
        </motion.details>

        <motion.details
          className="group [&_summary::-webkit-details-marker]:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
            <h2 className="font-medium">
              Motor apa saja yang tersedia untuk disewa?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            Kami memiliki berbagai jenis motor, mulai dari motor matic, bebek,
            hingga motor sport. Anda dapat melihat katalog motor lengkap kami di
            halaman pemesanan.
          </p>
        </motion.details>
      </div>
    </motion.div>
  );
};

export default FaQ;
