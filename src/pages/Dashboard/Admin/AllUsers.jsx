/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/Loading Animation.json";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading: isUsersLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: bookedParcels = [], isLoading: isParcelsLoading } = useQuery({
    queryKey: ["bookedParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookedParcels");
      return res.data;
    },
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const handleRoleChange = (_id, role) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/users/role/${_id}`, { role });
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "Role Changed Successfully!",
              icon: "success",
              timer: 1500,
            });
          } else {
            Swal.fire({
              title: "No Change!",
              text: "User already has this role.",
              icon: "info",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update role. Please try again.",
        icon: "error",
      });
    }
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const isLoading = isUsersLoading || isParcelsLoading;

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold my-0 lg:my-4 text-center pb-4">
        ALL REGISTERED USERS
      </h2>
      {/* TABLE */}
      {isLoading ? (
        <div className="flex justify-center items-center my-16">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-24 h-24"
          />
        </div>
      ) : (
        <>
          {/* FOR LARGE SCREEN */}
          <div className="overflow-x-auto hidden lg:block">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="text-xs">
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Booked</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr className="text-xs">
                    <th className="font-semibold">{index + 1}</th>
                    <td className="font-semibold">{user.name}</td>
                    <td className="font-semibold">
                      {bookedParcels.find(
                        (parcel) => parcel.email === user.email
                      )?.phone ||
                        user.phone ||
                        "N/A"}
                    </td>
                    <td className="font-semibold">
                      {
                        bookedParcels.filter(
                          (parcel) => parcel.email === user.email
                        ).length
                      }
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          document.getElementById("role_modal").showModal();
                        }}
                        className="btn bg-[#ff6a00] text-white uppercase w-[85px] btn-xs"
                      >
                        {user.role}
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-3xl text-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOR SMALL SCREEN */}
          <div className="overflow-x-auto block md:hidden">
            {users.map((user, index) => (
              <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                <tbody>
                  <tr>
                    <th>Serial</th>
                    <td className="font-semibold">{index + 1}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td className="font-semibold">{user.name}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td className="font-semibold">
                      {" "}
                      {bookedParcels.find(
                        (parcel) => parcel.email === user.email
                      )?.phone ||
                        user.phone ||
                        "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <th>Booked</th>
                    <td className="font-semibold">
                      {" "}
                      {
                        bookedParcels.filter(
                          (parcel) => parcel.email === user.email
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td className="font-semibold">
                      {" "}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          document.getElementById("role_modal").showModal();
                        }}
                        className="btn bg-[#ff6a00] text-white uppercase w-[85px] btn-xs"
                      >
                        {user.role}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Action</th>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-3xl text-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </>
      )}
      <dialog id="role_modal" className="modal modal-middle">
        <div className="modal-box">
          {selectedUser && (
            <>
              <p className="my-2">
                Set <strong>{selectedUser.name}</strong> as:
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleRoleChange(selectedUser._id, "admin");
                    document.getElementById("role_modal").close();
                  }}
                  className="btn bg-red-500 text-white"
                >
                  Admin
                </button>
                <button
                  onClick={() => {
                    handleRoleChange(selectedUser._id, "deliveryman");
                    document.getElementById("role_modal").close();
                  }}
                  className="btn bg-green-700 text-white"
                >
                  Delivery Man
                </button>
              </div>
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* Close button */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllUsers;
