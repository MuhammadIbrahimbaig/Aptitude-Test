import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4001/Mywork/Feedback", {
        n: username,
        e: email,
        r: rating,
        c: comment,
      });

      toast.success(" Feedback Created Successfully!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });

      setUsername("");
      setEmail("");
      setRating("");
      setComment("");
    } catch (error) {
      toast.error(
        ` Error: ${error.response?.data?.msg || error.message}`,
        {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  }

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
    <ToastContainer />
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-5xl">
      
      {/* Left Side Form */}
      <form
        onSubmit={submit}
        className="p-8 flex flex-col justify-center"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Guest Feedback
        </h2>

        {/* Name & Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Name */}
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-2 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          {/* Rating */}
          <div>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-2 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
              <option value="4">⭐⭐⭐⭐ - Good</option>
              <option value="3">⭐⭐⭐ - Average</option>
              <option value="2">⭐⭐ - Poor</option>
              <option value="1">⭐ - Very Bad</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Only registered emails are allowed"
            className="w-full px-2 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Comment */}
        <div className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your Comment"
            className="w-full px-2   py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-2 bg-gradient-to-r from-[#1351d8] to-[#9c00ff] transition duration-200 font-semibold shadow-md"
        >
          Submit Feedback
        </button>
      </form>

      {/* Right Side Image */}
      <div className="hidden md:block  ">
        <img
          src="https://www.theluxeinsider.com/wp-content/uploads/2022/10/Businessman-pressing-bell-at-hotel-reception.jpeg"
          alt="Feedback Illustration"
          className="w-full h-full p-3 rounded-5 object-cover "
        />
      </div>
    </div>
  </div>
);


}
