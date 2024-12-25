import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

interface Person {
  id: string;
  name: string;
  email: string;
}

// Sample in-memory data
let people: Person[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];

// GET: Fetch all people
app.get('/api/people', (req: Request, res: Response) => {
  res.json(people);
});

// DELETE: Delete a person by ID
app.delete('/api/person/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = people.findIndex((person) => person.id === id);

  if (index !== -1) {
    people.splice(index, 1); // Remove person from the array
    return res.status(200).json({ message: 'Person deleted successfully' });
  }

  res.status(404).json({ message: 'Person not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
