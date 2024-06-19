import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // Remove useNewUrlParser and useUnifiedTopology options
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

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

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

export async function POST(req, res) {
  try {
    await connectToDatabase();

    const { name, email, mobile, course } = await req.json();
    
    const enrollment = new Enrollment({
      name,
      email,
      mobile,
      course,
    });

    await enrollment.save();

    console.log('Enrollment saved:', enrollment);

    return NextResponse.json({ message: 'Enrollment successful' }, { status: 201 });
  } catch (error) {
    console.error('Error saving enrollment:', error);
    return NextResponse.json({ message: 'Error saving enrollment', error: error.message }, { status: 500 });
  }
}
