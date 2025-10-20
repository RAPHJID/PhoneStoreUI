import React from "react";

const About = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About This Website</h1>
      <p className="text-gray-700 mb-2">
        Welcome to our Phone Store! Here you can browse a variety of phones,
        check their details, and see the latest prices.
      </p>
      <p className="text-gray-700 mb-2">
        This website is built using React on the frontend and communicates with
        an ASP.NET backend API to fetch phone data.
      </p>
      <p className="text-gray-700">
        Our goal is to make phone shopping simple and efficient. Stay tuned for
        more features coming soon!
      </p>
    </div>
  );
};

export default About;
