import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface DataRow {
  id: number;
  name: string;
  email: string;
}

const Task1: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const result = await response.json();
      const formattedData = result.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
      }));
      setData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleView = (id: number, name: string, email: string) => {
    setMessage(`Viewing details for ID: ${id},${name},${email}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((row) => row.id !== id));
      setMessage(`Deleted row with ID: ${id}`);
    } catch (error) {
      console.error("Error deleting row:", error);
      setMessage("Error deleting row");
    }
  };

  const handleViewAll = () => {
    const allIds = data.map((row) => row.id).join(", ");
    setMessage(`Viewing details for all IDs: ${allIds}`);
  };

  const handleDeleteAll = async () => {
    try {
      await Promise.all(
        data.map((row) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${row.id}`, {
            method: "DELETE",
          })
        )
      );
      setData([]);
      setMessage("Deleted all rows");
    } catch (error) {
      console.error("Error deleting all rows:", error);
      setMessage("Error deleting all rows");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          {message && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
              {message}
            </div>
          )}
          <div className="flex justify-end mb-4">
            <Link
              to="/user-detail"
              className="text-indigo-600 hover:text-indigo-900 mr-4"
            >
              view all
            </Link>
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete All
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.email}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <Link
                          to={`/user-detail/${row.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          view
                        </Link>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task1;
