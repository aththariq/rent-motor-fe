import motor from "../assets/motorss.webp";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${motor})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#03045e",
            opacity: "0.6",
          }}
        ></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-left text-3xl font-extrabold text-white sm:text-5xl"
            >
              Di mana saja
              <strong className="block font-extrabold text-primary-light">
                {" "}
                Kapan saja.{" "}
              </strong>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left mt-4 max-w-lg text-white sm:text-xl/relaxed"
            >
              Temukan fleksibilitas dalam mobilitas dengan layanan rental motor
              terbaik kami. Mulai sekarang dan jelajahi kebebasan berkendara.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <motion.a
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="block w-full rounded bg-primary-light px-12 py-3 text-sm font-medium text-secondary shadow hover:bg-primary-extra focus:outline-none focus:ring active:bg-secondary active:text-primary-extra sm:w-auto"
              >
                Get Started
              </motion.a>

              <motion.a
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-secondary shadow hover:text-primary focus:outline-none focus:ring active:text-secondary sm:w-auto"
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
