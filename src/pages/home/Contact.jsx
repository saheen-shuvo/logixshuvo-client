/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!form.current) return;

    try {
      setSending(true);

      await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY },
      );

      Swal.fire("Success!", "Email sent successfully.", "success");
      form.current.reset();
    } catch (error) {
      Swal.fire(
        "Failed!",
        `Could not send email: ${error?.text || "Error"}`,
        "warning",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact-us"
      className="px-4 mt-10 lg:mt-20 max-w-screen-xl mx-auto scroll-mt-24"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight lg:py-2 uppercase">
          Contact & Support
        </h2>
        <p className="mt-2 text-sm text-gray-500 px-4 mb-10">
          Feel free to ask any queries or get support about our services or
          platform.
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="flex justify-center"
      >
        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full max-w-xl rounded-2xl bg-base-100 shadow-lg p-6 md:p-8 border border-gray-100"
        >
          <h3 className="text-lg md:text-xl font-semibold text-center text-gray-700">
            What's on your mind? Feel free to share!
          </h3>

          <div className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0276b6]/40 focus:border-[#0276b6]/40"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0276b6]/40 focus:border-[#0276b6]/40"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write your message..."
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 h-32 resize-none outline-none focus:ring-2 focus:ring-[#0276b6]/40 focus:border-[#0276b6]/40"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={sending}
              className="w-full rounded-xl bg-[#8c87d7] text-white font-semibold py-3 border-b-4 border-[#0076b6af] shadow-md hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Message"}
            </motion.button>

            <p className="text-xs text-gray-400 text-center">
              We usually reply within 24 hours.
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
