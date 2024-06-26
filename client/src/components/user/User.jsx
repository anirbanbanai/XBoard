import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const User = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/v1/api/userdata`);
        setData(result.data); // Assuming result.data is the array of user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const makeAdmin = async (userId) => {
    const userToUpdate = data.find(user => user._id === userId);
    if (userToUpdate.role === "admin") {
      Swal.fire({
        position: "top",
        icon: "info",
        title: "User is already an admin",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const updateRole = () => {
      const data = { role: "admin" };
      axios.put(`http://localhost:8080/v1/api/userdata/${userId}`, data)
        .then(response => {
          if (response.data) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Role updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            // Update the local state to reflect the role change
            setData((prevData) =>
              prevData.map((item) =>
                item._id === userId ? { ...item, role: "admin" } : item
              )
            );
          }
        })
        .catch(error => {
          console.error("Error updating profile:", error);
        });
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole();
      }
    });
  };

  const deleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/v1/api/userdata/${userId}`);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "User deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          // Remove the deleted user from the local state
          setData((prevData) => prevData.filter((item) => item._id !== userId));
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Failed to delete user",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  // Logic for displaying current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td
                  className={`py-2 px-4 ${
                    item.role === "admin"
                      ? "text-green-600"
                      : item.role === "employee"
                      ? "text-red-400"
                      : "text-blue-600"
                  }`}
                >
                  {item.role}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => makeAdmin(item._id)}
                    className="btn btn-sm btn-success"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => deleteUser(item._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <RiDeleteBin6Fill className="text-xl" />
                  </button>
                  <button className="btn btn-sm btn-outline btn-warning">
                    <IoWarningOutline className="text-xl" /> Suspend User
                  </button>
                  <h2 className="text-blue-600">Verify</h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default User;
