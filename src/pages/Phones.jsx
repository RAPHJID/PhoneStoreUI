import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Phones = () => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); // <-- new
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("http://localhost:5082/api/Phone");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPhones(data);
        setFilteredPhones(data);
      } catch (err) {
        console.error("Error fetching phones:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  // Filter based on search
  useEffect(() => {
    let filtered = phones.filter(
      (phone) =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "stock-asc") {
      filtered.sort((a, b) => a.stockQuantity - b.stockQuantity);
    } else if (sortOption === "stock-desc") {
      filtered.sort((a, b) => b.stockQuantity - a.stockQuantity);
    } else if (sortOption === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredPhones(filtered);
  }, [searchTerm, sortOption, phones]);

  if (loading) return <p>Loading phones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center max-w-md mx-auto">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="stock-asc">Stock: Low → High</option>
          <option value="stock-desc">Stock: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>
      </div>

      {/* Phones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhones.map((phone) => (
          <div
            key={phone.id}
            className="relative border rounded-lg p-4 shadow hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group bg-white"
            onClick={() => navigate(`/phones/${phone.id}`)}
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

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold rounded transition">
              View Details
            </div>

            {/* Stock Badge */}
            <div className="absolute top-3 right-3">
              {phone.stockQuantity === 0 ? (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              ) : phone.stockQuantity < 5 ? (
                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Low Stock
                </span>
              ) : (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  In Stock
                </span>
              )}
            </div>

            {/* Optional New Arrival Badge */}
            {phone.isNew && (
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </span>
              </div>
            )}

            <h2 className="text-lg font-bold mt-2">{phone.name}</h2>
            <p className="text-sm text-gray-600">{phone.brand}</p>
            <p className="text-sm">{phone.description || "No description"}</p>
            <p className="text-lg font-semibold mt-2">Price: ${phone.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phones;
