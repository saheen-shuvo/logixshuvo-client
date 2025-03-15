/* eslint-disable react/no-unescaped-entities */
const Faq = () => {
  return (
    <div className="my-8 md:my-12 max-w-7xl mx-auto px-4 md:px-0">
      <h2 className="text-center text-3xl lg:text-5xl font-bold lg:py-2">
        TOP FAQ's
      </h2>
      <p className="text-center text-xs px-4 mb-8">
        Get most frequently asked question about our platform.
      </p>
      <div className="collapse collapse-arrow bg-base-100 border-1 border-gray-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          How can I track my parcel?
        </div>
        <div className="collapse-content">
          <p>Enter your tracking number in the "Track Your Parcel" section.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-1 border-gray-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          How do I register as a delivery partner?
        </div>
        <div className="collapse-content">
          <p>Click on "Become a Partner" and fill out the registration form.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-1 border-gray-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          What areas do you deliver to?
        </div>
        <div className="collapse-content">
          <p>We deliver nationwide. Check our coverage map for details.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-1 border-gray-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          How can I contact support?
        </div>
        <div className="collapse-content">
          <p>Use the "Contact & Support" section via email, chat, or phone.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-1 border-gray-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Can I reschedule a delivery?
        </div>
        <div className="collapse-content">
          <p>Yes, log in to your account and select "Reschedule Delivery."</p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
