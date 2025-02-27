/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch, isLoading: isUsersLoading } = useQuery({
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
      <div className="flex justify-evenly my-4">
        <h2 className="text-2xl font-semibold">All Users</h2>
        <h2 className="text-2xl font-semibold">Total Users: {users.length}</h2>
      </div>
      {/* TABLE */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-28">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Parcels Booked</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td className="font-semibold">{user.name}</td>
                <td className="font-semibold">
                {bookedParcels.find((parcel) => parcel.email === user.email)?.phone || user.phone || "N/A"}
                </td>
                <td className="font-semibold">
                {bookedParcels.filter((parcel) => parcel.email === user.email).length}
                </td>
                <th>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      document.getElementById("role_modal").showModal();
                    }}
                    className="btn btn-primary w-20 btn-xs"
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
      )}
      <dialog id="role_modal" className="modal modal-bottom sm:modal-middle">
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
                  className="btn btn-primary"
                >
                  Admin
                </button>
                <button
                  onClick={() => {
                    handleRoleChange(selectedUser._id, "deliveryman");
                    document.getElementById("role_modal").close();
                  }}
                  className="btn btn-primary"
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
