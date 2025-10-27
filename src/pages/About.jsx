import React from "react";
import { motion } from "framer-motion";
import { Smartphone, ShoppingBag, Zap, Code } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          About <span className="text-green-600">PhoneStore</span>
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Discover the latest smartphones, compare specs and prices, and enjoy
          a seamless shopping experience — all in one place.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl shadow-sm"
          >
            <Smartphone className="w-12 h-12 text-green-600 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Your Modern Phone Store
            </h2>
            <p className="text-gray-600">
              Browse our curated selection of phones, each powered by real-time
              data from our backend API. Find the perfect balance between
              performance, design, and value.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl shadow-sm"
          >
            <ShoppingBag className="w-12 h-12 text-green-600 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Seamless Shopping
            </h2>
            <p className="text-gray-600">
              Our React-powered frontend ensures a smooth, fast, and intuitive
              experience — whether you’re browsing on desktop or mobile.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl shadow-sm"
          >
            <Zap className="w-12 h-12 text-green-600 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Blazing Fast & Reliable
            </h2>
            <p className="text-gray-600">
              With ASP.NET Core and SQL Server powering the backend, you get a
              stable, secure, and high-performance platform.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl shadow-sm"
          >
            <Code className="w-12 h-12 text-green-600 mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Built with Passion
            </h2>
            <p className="text-gray-600">
              PhoneStore is built by developers who care about quality,
              performance, and clean design — bringing code and creativity
              together.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PhoneStore. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
