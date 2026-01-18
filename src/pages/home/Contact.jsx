/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!form.current) {
      console.error("Form reference is null.");
      return;
    }

    const formData = new FormData(form.current);
    console.log("Form Data:", Object.fromEntries(formData));

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          Swal.fire("Success!", "Email Sent successfully", "success");
        },
        (error) => {
          Swal.fire(
            "Failed!",
            `Could not send email: ${error.text}`,
            "warning"
          );
        }
      );
  };

  return (
    <section
      id="contact"
      className="px-4 mt-8 lg:mt-16 max-w-screen-xl mx-auto"
    >
      <h2 className="text-center text-3xl lg:text-5xl font-bold lg:py-2">
        CONTACT & SUPPORT
      </h2>
      <p className="text-center text-xs px-4 mb-8">
        Feel free to ask any queries or support about our services or platform.
      </p>

      <div className="max-w-screen-xl mx-auto text-center mt-8">
        <div className="flex justify-center items-center ">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-[50%]"
          >
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              What's on your mind? Feel free to share!
            </h2>

            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="user_name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <label className="block text-gray-600 font-medium mt-3 mb-1">
              Message
            </label>
            <textarea
              name="message"
              className="w-full p-2 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>

            <input
              type="submit"
              value="Send"
              className="btn bg-[#8c87d7]  px-12 border-0 border-b-4 border-[#0076b6af] w-full text-white py-2 rounded-lg hover:bg-[#0076b6af] transition cursor-pointer my-8"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
