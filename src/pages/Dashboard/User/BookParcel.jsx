import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../../context/AuthContext/AuthContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const parcelWeight = watch("weight");

  useEffect(() => {
    if (user) {
      setValue("name", user?.displayName || "");
      setValue("email", user?.email || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const bookingDate = new Date();
    const approximateDeliveryDate = new Date();
    approximateDeliveryDate.setDate(bookingDate.getDate() + 3);

    const parcelData = {
      ...data,
      bookingDate: bookingDate.toISOString(),
      approximateDeliveryDate: approximateDeliveryDate.toISOString(),
      deliveryManId: null,
      deliveryStatus: "pending",
    };

    const bookedParcels = await axiosPublic.post("/bookedParcels", parcelData);
    console.log(bookedParcels.data);
    if (bookedParcels.data.insertedId) {
      reset();
      navigate("/dashboard/myparcels");
      Swal.fire({
        position: "center",
        title: `Your Parcel Booked Successfully!`,
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    if (parcelWeight) {
      const weight = parseFloat(parcelWeight);
      let charge = 50;
      if (weight == 2) {
        charge = 100;
      } else if (weight > 2) {
        charge = 150;
      }
      setValue("deliveryCharge", charge.toFixed(2));
    }
  }, [parcelWeight, setValue]);

  // Get the minimum valid date (3 days ahead)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Add 3 days
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold my-0 lg:my-4 text-center pb-4">
        BOOK A PARCEL
      </h2>
      {/* FORM */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* NAME */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Name*</span>
              </div>
              <input
                type="text"
                placeholder="Name"
                readOnly
                {...register("name")}
                className="input input-bordered w-full "
              />
            </label>

            {/* EMAIL */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Email*</span>
              </div>
              <input
                type="email"
                readOnly
                placeholder="Email"
                {...register("email")}
                className="input input-bordered w-full "
              />
            </label>

            {/* PHONE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Phone Number*</span>
              </div>
              <input
                type="number"
                required
                placeholder="Phone"
                {...register("phone")}
                className="input input-bordered w-full "
              />
            </label>

            {/* WEIGHT */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Parcel Weight (kg)*</span>
              </div>
              <input
                type="number"
                placeholder="Weight"
                {...register("weight", {
                  required: "Weight is required",
                  min: 1,
                  max: 10,
                })}
                className="input input-bordered w-full "
              />
              {errors.weight && (
                <p className="text-red-700 text-sm">
                  Weight must be between 1-10 kg
                </p>
              )}
            </label>

            {/* TYPE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Parcel Type*</span>
              </div>
              <input
                type="text"
                placeholder="Type"
                required
                {...register("type")}
                className="input input-bordered w-full "
              />
            </label>

            {/* RECEIVERS */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Receivers Name*</span>
              </div>
              <input
                type="text"
                placeholder="Name"
                required
                {...register("receiversName")}
                className="input input-bordered w-full "
              />
            </label>

            {/* RECEIVERS PHONE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Receivers Phone*</span>
              </div>
              <input
                type="number"
                placeholder="Phone"
                required
                {...register("receiversPhone")}
                className="input input-bordered w-full "
              />
            </label>

            {/* DELIVERY ADDRESS */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Delivery Address*</span>
              </div>
              <input
                type="text"
                placeholder="Address"
                required
                {...register("deliveryAddress")}
                className="input input-bordered w-full "
              />
            </label>

            {/* REQUESTED DELIVERY DATE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text"> Request Delivery Date*</span>
              </div>
              <input
                type="date"
                placeholder="Date"
                {...register("deliveryDate", {
                  required: "Delivery date is required",
                  validate: (value) =>
                    value >= getMinDate() ||
                    "Date must be at least 3 days ahead",
                })}
                className="input input-bordered w-full "
                min={getMinDate()}
              />
              {errors.deliveryDate && (
                <p className="text-red-500">{errors.deliveryDate.message}</p>
              )}
            </label>

            {/* DELIVERY LATITUDE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text"> Delivery Address Latitude*</span>
              </div>
              <input
                type="number"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude is required",
                  pattern: {
                    value: /^-?([0-8]?[0-9](\.\d+)?|90(\.0+)?)$/,
                    message: "Invalid latitude (-90 to 90)",
                  },
                })}
                className="input input-bordered w-full "
              />
              {errors.latitude && (
                <span className="text-red-700 text-sm">
                  {errors.latitude.message}
                </span>
              )}
            </label>

            {/* DELIVERY LONGITUDE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text"> Delivery Address Longitude*</span>
              </div>
              <input
                type="number"
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude is required",
                  pattern: {
                    value: /^-?(1?[0-7]?[0-9](\.\d+)?|180(\.0+)?)$/,
                    message: "Invalid longitude (-180 to 180)",
                  },
                })}
                className="input input-bordered w-full "
              />
              {errors.longitude && (
                <span className="text-red-700 text-sm">
                  {errors.longitude.message}
                </span>
              )}
            </label>

            {/* DELIVERY CHARGE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Delivery Charge*</span>
              </div>
              <input
                type="text"
                placeholder="Charge"
                {...register("deliveryCharge")}
                readOnly
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* SUBMIT BTN */}
          <div className="flex justify-center my-8">
            <input
              className="btn bg-[#8c87d7]   border-b-4 border-[#0076b6af] border-0 text-white px-8"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookParcel;
