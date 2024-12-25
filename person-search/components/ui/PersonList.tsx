import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Person } from '../types';

const PersonList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/people');
        const data: Person[] = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchPeople();
  }, []);

  const handleDelete = (id: string) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
  };

  return (
    <div>
      {people.map((person) => (
        <UserCard key={person.id} user={person} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default PersonList;
