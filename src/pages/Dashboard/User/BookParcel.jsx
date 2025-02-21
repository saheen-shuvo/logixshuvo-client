import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../../context/AuthContext/AuthContext";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const BookParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue, watch, reset } = useForm();
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
      deliveryStatus: "pending"
    };

    const bookedParcels = await axiosPublic.post("/bookedParcels", parcelData);
    console.log(bookedParcels.data);
    if (bookedParcels.data.insertedId) {
      reset();
      Swal.fire({
        position: "center",
        title: `Your Parcel Booked Successfully!`,
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
      });
    }
  }

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

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center my-4">BOOK A PARCEL</h1>
      </div>
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
                {...register("weight")}
                className="input input-bordered w-full "
              />
            </label>

            {/* TYPE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text">Parcel Type*</span>
              </div>
              <input
                type="text"
                placeholder="Type"
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
                {...register("deliveryAddress")}
                className="input input-bordered w-full "
              />
            </label>

            {/* DELIVERY DATE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text"> Request Delivery Date*</span>
              </div>
              <input
                type="date"
                placeholder="Date"
                {...register("deliveryDate")}
                className="input input-bordered w-full "
              />
            </label>

            {/* DELIVERY LATITUDE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text"> Delivery Address Latitude*</span>
              </div>
              <input
                type="text"
                placeholder="Latitude"
                {...register("latitude")}
                className="input input-bordered w-full "
              />
            </label>

            {/* DELIVERY LONGITUDE */}
            <label className="form-control w-full  flex flex-col">
              <div className="label">
                <span className="label-text"> Delivery Address Longitude*</span>
              </div>
              <input
                type="text"
                placeholder="Longitude"
                {...register("longitude")}
                className="input input-bordered w-full "
              />
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
          <div className="flex justify-center my-3">
            <input className="btn btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookParcel;
