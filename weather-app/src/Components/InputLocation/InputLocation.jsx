import React from "react";
import "./InputLocation.css";
import Input from "../Input/Input";

// InputLocation.jsx
const InputLocation = ({ locationRef, handleSearch, handleCurrent }) => {
  if (!locationRef) return null; // Kiểm tra nếu locationRef là null
  return (
    <aside className="input-location sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 px-6 py-6 ">
      <div className="location-field">
        <p className="w-full mb-3 font-semibold">Enter a City Name</p>
        <Input ref={locationRef} type="text" value="Thu Duc" />
        <button
          onClick={handleSearch}
          className="w-full text-white bg-blue-500 my-3 h-10 border border-gray-300 hover:bg-blue-700 rounded-md"
        >
          Search
        </button>
        <div className="separator"></div>
        <button
          onClick={handleCurrent}
          className="w-full text-white bg-gray-500 my-3 h-10 border border-gray-300 hover:bg-gray-600 rounded-md"
        >
          Use Current Location
        </button>
      </div>
    </aside>
  );
};

export default InputLocation;
