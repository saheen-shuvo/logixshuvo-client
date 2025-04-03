import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/parcels/${id}`)
      .then((response) => {
        const parcel = response.data;
        Object.keys(parcel).forEach((key) => setValue(key, parcel[key]));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parcel:", error);
        setLoading(false);
      });
  }, [id, setValue, axiosPublic]);

  const onSubmit = (data) => {
    const { _id, ...dataWithoutId } = data;
    console.log("Updating parcel with ID:", _id);
    axiosPublic
      .put(`/parcels/${id}`, dataWithoutId)
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Success!", "Parcel updated successfully", "success");
          navigate("/dashboard/myparcels");
        } else {
          Swal.fire("Error!", "Failed to update parcel", "error");
        }
      })
      .catch((error) => {
        console.error("Error updating parcel:", error);
        Swal.fire("Error!", "Something went wrong", "error");
      });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold my-0 lg:my-4 text-center pb-4">
        UPDATE THE PARCEL
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

export default UpdateParcel;
