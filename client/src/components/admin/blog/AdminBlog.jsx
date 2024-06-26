import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import BlogUpdateModal from "../../../common/BlogUpdateModal";
import Swal from "sweetalert2";
import useAuthUser from "../../../auth/getUser";
import { auth } from "../../../firebase";
import  { ButtonAll2 } from "../../button/Button";
import { Link } from "react-router-dom";

const AdminBlog = () => {
  const {user} = useAuthUser(auth);
  console.log(user);
  const [editId, setEditId] = useState();
  const [datad, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (id) => {
    setIsModalOpen(true);
    setEditId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/v1/api/blogs`);
        setData(result.data); // Assuming result.data is the array of user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async (userId) => {
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
          await axios.delete(`http://localhost:8080/v1/api/blogs/${userId}`);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Blog deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          // Remove the deleted blog from the local state
          setData((prevData) => prevData.filter((item) => item._id !== userId));
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Failed to delete blog",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const updateBlogInState = (updatedBlog) => {
    setData((prevData) =>
      prevData.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {datad.map((m) => (
        <div className="border-2 border-base-300 rounded-2xl p-3" key={m._id}>
          <h2 className="text-3xl font-semibold mt-3">{m.headline}</h2>
          <div className="flex justify-between mt-6">
            <h2 className="text-blue-500">By {m.createdby}</h2>
            <h2 className="text-purple-500">Date: {new Date(m.createdAt).toLocaleDateString()}</h2>
          </div>
        {user?.role==='admin' &&  <div className="flex justify-between mt-6">
            <button
              onClick={() => handleEditClick(m._id)}
              className="btn btn-outline btn-warning"
            >
              <CiEdit className="text-xl" /> Edit Article
            </button>
            <button onClick={() => deleteBlog(m._id)} className="btn btn-outline btn-error">
              <RiDeleteBin6Line className="text-xl" /> Delete
            </button>
          </div>}

         <Link to={`/blog/${m._id}`}>
         <div className="flex justify-center mt-5  w-full">
            <ButtonAll2>See more</ButtonAll2>
          </div>
         </Link>
        </div>
      ))}

      <BlogUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={editId}
        onUpdate={updateBlogInState} // Pass the callback function to update the blog in the state
      />
    </div>
  );
};

export default AdminBlog;
