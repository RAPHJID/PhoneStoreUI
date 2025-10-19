import React, { useEffect, useState } from "react";

const Phones = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("http://localhost:5082/api/Phone"); 
        if (!response.ok) {
          throw new Error("Failed to fetch phones");
        }
        const data = await response.json();
        setPhones(data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading phones...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Phones List</h1>
      {phones.length === 0 ? (
        <p className="text-gray-600">No phones available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {phones.map((phone) => (
            <div
              key={phone.id}
              className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{phone.brandName}</h2>
              <p className="text-gray-700">Model: {phone.model}</p>
              <p className="text-gray-700">Storage: {phone.storage} GB</p>
              <p className="text-gray-700">Price: ${phone.price}</p>
              <p className="text-sm text-gray-500 mt-2">
                Supplier: {phone.supplierName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Phones;
