import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PhoneDetails = () => {
  const { id } = useParams(); 
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await fetch(`http://localhost:5082/api/Phone/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  if (loading) return <p>Loading phone details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!phone) return <p>No phone found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow">
      {phone.imageUrl ? (
        <img
          src={phone.imageUrl}
          alt={phone.name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4 rounded">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2">{phone.name}</h1>
      <p className="text-lg font-semibold">{phone.brand}</p>
      <p className="text-gray-700 mt-2">{phone.description || "No description available."}</p>
      <p className="text-xl font-semibold mt-4">Price: ${phone.price}</p>
      <p className="text-gray-600 mt-1">Stock: {phone.stockQuantity}</p>
    </div>
  );
};

export default PhoneDetails;
