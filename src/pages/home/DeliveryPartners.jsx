import { motion } from "framer-motion";

const logos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/subversion/subversion-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/protractor/protractor-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/msdos/msdos-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gatsby/gatsby-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/filezilla/filezilla-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elm/elm-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const DeliveryPartners = () => {
  return (
    <motion.div id="partners"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className="mt-8 lg:mt-16 max-w-screen-xl mx-auto px-4 md:px-0 scroll-mt-24"
    >
      <motion.h2
        variants={item}
        className="text-center text-3xl lg:text-5xl font-bold lg:py-2"
      >
        OUR DELIVERY PARTNERS
      </motion.h2>

      <motion.p
        variants={item}
        className="text-center text-xs px-4 mb-8 text-gray-500"
      >
        Introducing our proud delivery partners that make business trusted.
      </motion.p>

      {/* Logos */}
      <motion.div
        variants={container}
        className="flex flex-wrap justify-center items-center"
      >
        {logos.map((src, idx) => (
          <motion.img
            key={idx}
            variants={item}
            whileHover={{ scale: 1.12 }}
            src={src}
            alt="partner logo"
            className="w-6 md:w-12 m-2 md:m-3 opacity-80 hover:opacity-100 transition"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DeliveryPartners;
