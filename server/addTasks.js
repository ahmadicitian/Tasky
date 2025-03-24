import mongoose from 'mongoose';
import { Task } from './models/taskSchema.js';

//* MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/TaskDb';

//* Sample data 
const sampleTasks = [
  { title: 'Buy Groceries', description: 'Go to the store and buy the essential groceries for the week', completed: false, priority: 'low' },
  { title: 'Clean the Room', description: 'Tidy up the room by picking up clothes and dusting the surfaces', completed: false, priority: 'low' },
  { title: 'Send Email to Client', description: 'Write and send an email to the client about the project update', completed: false, priority: 'medium' },
  { title: 'Call the Doctor', description: 'Call the doctor’s office to schedule an appointment', completed: false, priority: 'low' },
  { title: 'Water the Plants', description: 'Water the indoor plants to keep them healthy', completed: false, priority: 'low' },
  { title: 'Prepare Breakfast', description: 'Make a simple breakfast such as eggs and toast', completed: false, priority: 'low' },
  { title: 'Check Social Media', description: 'Browse through your social media accounts to check any new updates', completed: false, priority: 'low' },
  { title: 'Organize Desk', description: 'Clean your desk by putting away papers and organizing supplies', completed: false, priority: 'low' },
  { title: 'Pay Bills', description: 'Pay the electricity and internet bills online', completed: false, priority: 'medium' },
  { title: 'Walk the Dog', description: 'Take the dog for a walk around the block', completed: false, priority: 'low' }
];

//* Function to insert tasks into the database
const addTasks = async () => {
  try {
    //* Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    await Task.insertMany(sampleTasks);
    console.log('10 tasks added successfully!');

    //* Close the MongoDB connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error adding tasks:', err);
    mongoose.disconnect();
  }
};


addTasks();
