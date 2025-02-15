import img1 from '../../assets/image/safetyParcel.jpg'
import img2 from '../../assets/image/fastDelivery.jpg'
import img3 from '../../assets/image/doorDelivery.jpg'
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { FaDoorOpen, FaShippingFast } from 'react-icons/fa';

const OurFeatures = () => {
  return (
    <div className="mt-8 lg:mt-16 max-w-screen-xl mx-auto">
      <div className='mb-6 lg:mb-12'>
        <h2 className="text-center text-3xl lg:text-5xl font-bold lg:py-2">
          OUR FEATURES
        </h2>
        <p className="text-center text-xs px-4">
          Discover the key benefits that make our platform stand out.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 lg:mx-0">
        {/* CARD1 */}
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={img1}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title"><AiFillSafetyCertificate />Parcel Safety</h2>
            <p>Ensuring secure packaging, real-time tracking, and reliable delivery for every parcel.</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
        {/* CARD2 */}
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={img2}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title"><FaShippingFast />Super Fast Delivery</h2>
            <p>Lightning-fast shipping with efficient routes, real-time tracking, and on-time delivery.</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
        {/* CARD3 */}
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={img3}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title"><FaDoorOpen /> Doorstep Delivery</h2>
            <p>Convenient doorstep delivery with speed, security, and reliability for every package.</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
