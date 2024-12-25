import React from 'react';
import { Person } from '../types';

interface UserCardProps {
  user: Person;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/person/${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(user.id); // Notify parent to update the UI
      } else {
        alert('Failed to delete person');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserCard;
