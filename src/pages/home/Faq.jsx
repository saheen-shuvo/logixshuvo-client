/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

const Faq = () => {
  const faqs = [
    {
      q: "How can I track my parcel?",
      a: 'Enter your tracking number in the "Track Your Parcel" section.',
    },
    {
      q: "How do I register as a delivery partner?",
      a: 'Click on "Become a Partner" and fill out the registration form.',
    },
    {
      q: "What areas do you deliver to?",
      a: "We deliver nationwide. Check our coverage map for details.",
    },
    {
      q: "How can I contact support?",
      a: 'Use the "Contact & Support" section via email, chat, or phone.',
    },
    {
      q: "Can I reschedule a delivery?",
      a: 'Yes, log in to your account and select "Reschedule Delivery."',
    },
  ];

  return (
    <motion.div id="faqs"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-8 md:my-12 max-w-7xl mx-auto px-4 md:px-0 scroll-mt-24"
    >
      <div className="text-center">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight lg:py-2 uppercase">
          Top FAQ's
        </h2>
        <p className="mt-2 text-sm text-gray-500 px-4 mb-8">
          Get the most frequently asked questions about our platform.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
            className="rounded-2xl border border-gray-100 bg-base-100 shadow-sm hover:shadow-md transition"
          >
            <div className="collapse collapse-arrow">
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked={idx === 0}
              />
              <div className="collapse-title text-base md:text-lg font-semibold">
                {item.q}
              </div>
              <div className="collapse-content text-sm text-gray-600">
                <p>{item.a}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Faq;
