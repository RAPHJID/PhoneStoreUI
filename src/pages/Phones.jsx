import React, { useEffect, useState } from "react";

const Phones = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("http://localhost:5082/api/Phone");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPhones(data);
      } catch (err) {
        console.error("Error fetching phones:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) return <p>Loading phones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {phones.map((phone) => (
        <div
          key={phone.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          {phone.imageUrl ? (
            <img
              src={phone.imageUrl}
              alt={phone.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4 rounded">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h2 className="text-lg font-bold">{phone.name}</h2>
          <p className="text-sm text-gray-600">{phone.brand}</p>
          <p className="text-sm">{phone.description || "No description"}</p>
          <p className="text-lg font-semibold mt-2">Price: ${phone.price}</p>
          <p className="text-sm mt-1">
            Stock: {phone.stockQuantity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Phones;
