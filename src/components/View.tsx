import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <Link to="/" className="text-blue-500 mt-4 inline-block">
        Back to List
      </Link>
    </div>
  );
};

export default UserDetail;
