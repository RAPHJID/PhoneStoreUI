import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PhoneDetails = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await fetch(`http://localhost:5082/api/Phone/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPhone(data);
      } catch (err) {
        console.error("Error fetching phone:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhone();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading phone details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Error: {error}
      </div>
    );

  if (!phone)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        No phone found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          {phone.imageUrl ? (
            <motion.img
              src={phone.imageUrl}
              alt={phone.name}
              className="w-full h-96 object-contain rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-gray-400 bg-gray-200 rounded-xl">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{phone.name}</h1>
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
              {phone.brand}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {phone.description || "No description available."}
            </p>
            <p className="text-2xl font-semibold text-green-600 mb-8">
              ${phone.price?.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
            >
              ← Back
            </button>
            <button className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhoneDetails;
