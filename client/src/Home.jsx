import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [userOne, setUserOne] = useState("");
  const [userTwo, setUserTwo] = useState("");

  const data = { userOne, userTwo };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E2530] text-white">
      <div className="bg-[#272D3C] p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#00B0FF]">
          Compare Users
        </h1>

        <div className="mb-4">
          <label htmlFor="userOne" className="block mb-1 font-semibold">
            User One
          </label>
          <input
            type="text"
            name="userOne"
            value={userOne}
            onChange={(e) => setUserOne(e.target.value)}
            placeholder="Enter first username"
            className="w-full px-3 py-2 rounded-md bg-[#1E2530] border border-gray-600 focus:outline-none focus:border-[#00B0FF]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="userTwo" className="block mb-1 font-semibold">
            User Two
          </label>
          <input
            type="text"
            name="userTwo"
            value={userTwo}
            onChange={(e) => setUserTwo(e.target.value)}
            placeholder="Enter second username"
            className="w-full px-3 py-2 rounded-md bg-[#1E2530] border border-gray-600 focus:outline-none focus:border-[#00B0FF]"
          />
        </div>

        <Link
          to="/compare"
          state={{ data }}
          className="w-full block"
        >
          <button className="w-full bg-[#00B0FF] hover:bg-[#0091CC] text-white font-semibold py-2 rounded-md transition-colors cursor-pointer">
            Compare
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
