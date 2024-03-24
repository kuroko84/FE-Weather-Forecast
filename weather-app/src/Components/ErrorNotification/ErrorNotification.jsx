import React from "react";

const ErrorNotification = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-red-500 p-4 rounded-md shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-white font-bold">{message}</p>
          <button
            onClick={onClose}
            className="text-white font-bold bg-red-700 px-2 py-1 rounded-full hover:bg-red-900"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;
