const Contact = () => {
  return (
    <section id="contact" className="px-4 mt-8 lg:mt-16 max-w-screen-xl mx-auto">
      <h2 className="text-center text-3xl lg:text-5xl font-bold lg:py-2">
        CONTACT & SUPPORT
      </h2>
      <p className="text-center text-xs px-4 mb-8">
        Feel free to ask any queries or support about our services or platform.
      </p>

      <div className="max-w-screen-md mx-auto text-center">
        {/* Email Address */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Business Email</h3>
          <p className="text-lg">
            <a
              href="mailto:your-email@example.com"
              className="text-blue-500 hover:underline"
            >
              saheenshuvo182@gmail.com
            </a>
          </p>
        </div>

        {/* Phone Number (optional) */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Hotline Number</h3>
          <p className="text-lg">
            <a href="tel:+1234567890" className="text-blue-500 hover:underline">
              +8801751967704
            </a>
          </p>
        </div>

        {/* Optional: Contact Form */}
        <div className="">
          <h3 className="text-xl font-semibold">Ask Queries</h3>
          <form
            action="mailto:saheenshuvo182@gmail.com"
            method="POST"
            encType="text/plain"
          >
            <textarea
              name="message"
              rows="4"
              className="w-full p-2 my-4 border-2 border-gray-200 rounded-lg"
              placeholder="Write your message here"
            ></textarea>
            <button
              type="submit"
              className="bg-[#8c87d7]  mt-[25px] px-12 border-0 text-white border-b-4 border-[#0076b6af] btn"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
