import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apis from '../../../config/Api';
import UserCard from './UserCard';
import BigLoader from '../../components/BigLoader';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${apis.User}/all`);
      const allUsers = Array.isArray(data?.data) ? data.data : [];
      setUsers(allUsers);
      setFilteredUsers(allUsers); // initially show all
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = users.filter((user) =>
      (user.name && user.name.toLowerCase().includes(value)) ||
      (user.email && user.email.toLowerCase().includes(value)) ||
      (user.city && user.city.toLowerCase().includes(value)) ||
      (user.role && user.role.toLowerCase().includes(value))
    );

    setFilteredUsers(filtered);
  };

  if (loading) return <BigLoader />;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 pt-3">
      <h1 className="text-3xl font-bold mb-3 dark:text-gray-800 text-gray-100 text-center">
        Users
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name, email, city, or role..."
          value={search}
          onChange={handleSearch}
          className="p-2 w-full md:w-1/2 lg:w-1/3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:text-white dark:bg-gray-700"
        />
      </div>

      {/* Users grid */}
      {filteredUsers?.length > 0 ? (
        <div className=" ml-[20vw] w-[90%] grid grid-cols-1  md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} fetchUsers={fetchAllUsers} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500 dark:text-gray-400 mt-10">
          No users found
        </p>
      )}
    </div>
  );
};

export default AdminUsers;
