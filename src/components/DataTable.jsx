import React, { useState } from "react";
import { cn } from "@/lib/utils"; // Ensure this utility function is imported

const DataTable = ({ columns, data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of the items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="border border-gray-300 p-4 text-center bg-gray-100"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length ? (
            paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100 transition-colors">
                {columns.map((col) => (
                  <td key={col.accessor} className="border border-gray-300 p-4">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
        >
          Previous
        </button>
        <span className="flex items-center justify-center text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
