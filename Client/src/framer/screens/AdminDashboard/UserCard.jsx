import React, { useState } from 'react';
import axios from 'axios';
import apis from '../../../config/Api';
import {successToast,errorToast} from '../../components/Toastify'

const UserCard = ({ user, fetchUsers }) => {

    
  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [loading, setLoading] = useState(false);

  // Delete user
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) return;

    try {
      setLoading(true);
      await axios.delete(`${apis.User}/delete/${user._id}`);
      fetchUsers(); // refresh user list
      successToast("User deleted successfully!")
    } catch (err) {
      console.error(err);
      errorToast('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  // Block / Unblock user
  const handleToggleBlock = async () => {
    try {
      setLoading(true);
      if (isBlocked) {
        await axios.put(`${apis.User}/unblock/${user._id}`);
        setIsBlocked(false);
        successToast("User unblocked successfully!")
      } else {
        await axios.put(`${apis.User}/block/${user._id}`);
        setIsBlocked(true);
        successToast("User blocked successfully!")
      }
      fetchUsers(); 
    } catch (err) {
      console.error(err);
      errorToast('Failed to update user status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-4 w-[80%] mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-600 mb-1"><strong>City:</strong> {user.city || 'N/A'}</p>
      <p className="text-gray-600 mb-1"><strong>Country:</strong> {user.country || 'N/A'}</p>
      <p className="text-gray-600 mb-2"><strong>Role:</strong> {user.role || 'User'}</p>

      {/* Admin controls */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

        <button
          onClick={handleToggleBlock}
          disabled={loading}
          className={`px-3 py-1 rounded text-white ${
            isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {isBlocked ? 'Unblock' : 'Block'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
