import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Testimonials = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      origin: "center",
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: {
          origin: "auto",
          perView: 1.5,
          spacing: 32,
        },
      },
    },
  });
  const testimonialsData = [
    {
      id: 1,
      name: "Ahmad Putra",
      content:
        "Layanan yang luar biasa! Motor dalam kondisi sangat baik, prosesnya cepat, dan stafnya sangat ramah. Sangat memuaskan!",
      rating: 5,
    },
    {
      id: 2,
      name: "Siti Aisyah",
      content:
        "Pengalaman menyewa motor yang sangat menyenangkan. Proses mudah, harga terjangkau, dan motornya sangat nyaman dipakai.",
      rating: 5,
    },
    {
      id: 3,
      name: "Budi Santoso",
      content:
        "Motor dalam kondisi prima, pelayanan ramah, dan cocok untuk perjalanan jauh. Sangat direkomendasikan!",
      rating: 4,
    },
    {
      id: 4,
      name: "Ratna Dewi",
      content:
        "Pelayanannya baik dan cepat. Sangat membantu saat saya butuh kendaraan mendadak. Terima kasih banyak!",
      rating: 4,
    },
    {
      id: 5,
      name: "Indra Gunawan",
      content:
        "Motor bagus dan nyaman, tapi ada sedikit keterlambatan saat pengambilan. Semoga lebih cepat ke depannya.",
      rating: 4,
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left">
              Testimoni nyata dari pelanggan kami...
            </h2>
            <p className="mt-4 text-gray-700 text-left">
              Dari kenyamanan berkendara hingga kemudahan proses sewa—ini adalah
              cerita nyata dari mereka yang telah mempercayai kami.
            </p>
            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                aria-label="Previous slide"
                onClick={() => instanceRef.current?.prev()}
                className="rounded-full border border-primary-dark p-3 text-primary-dark transition hover:bg-primary-dark hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                aria-label="Next slide"
                onClick={() => instanceRef.current?.next()}
                className="rounded-full border border-primary-dark p-3 text-primary-dark transition hover:bg-primary-dark hover:text-white"
              >
                <svg
                  className="size-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <div ref={sliderRef} className="keen-slider">
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="keen-slider__slide">
                  <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                    <div>
                      <div className="flex gap-0.5 text-secondary">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <svg
                            key={j}
                            className="size-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-2xl font-bold text-primary-dark sm:text-3xl">
                          {testimonial.name}
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-700">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>
                    <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                      &mdash; {testimonial.name}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            aria-label="Previous slide"
            onClick={() => instanceRef.current?.prev()}
            className="rounded-full border border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
          >
            <svg
              className="size-5 -rotate-180 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => instanceRef.current?.next()}
            className="rounded-full border border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
