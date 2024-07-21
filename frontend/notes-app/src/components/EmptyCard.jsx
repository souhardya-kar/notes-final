import React from "react";

const EmptyCard = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h3l1-1h4l1 1h3a2 2 0 012 2v14a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-lg font-semibold text-slate-700">{message}</p>
        <p className="text-sm text-slate-500 mt-2">
          Add new notes to get started.
        </p>
      </div>
    </div>
  );
};

export default EmptyCard;
