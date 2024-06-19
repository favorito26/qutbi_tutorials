import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Validate MongoDB URI presence
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Cached MongoDB connection
let cached = global.mongoose;

// Ensure a single connection instance is used
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Function to connect to MongoDB and cache connection
async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// MongoDB schema definition
const EnrollmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

// MongoDB model creation or retrieval
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

// API route handler for POST requests
export async function POST(req) {
  // Ensure MongoDB connection
  await connectToDatabase();

  try {
    // Extract data from request body
    const { name, email, mobile, course } = await req.json();
    
    // Create new enrollment document
    const enrollment = new Enrollment({
      name,
      email,
      mobile,
      course,
    });

    // Save enrollment document to MongoDB
    await enrollment.save();

    // Respond with success message
    return NextResponse.json({ message: 'Enrollment successful' }, { status: 201 });
  } catch (error) {
    // Handle errors and respond with error message
    console.error('Error saving enrollment:', error);
    return NextResponse.json({ message: 'Error saving enrollment', error: error.message }, { status: 500 });
  }
}
