import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
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
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

// POST: Create a new review
export async function POST(request) {
  await connectToDatabase();

  try {
    const { name, rating, reviewText } = await request.json();

    if (!name || !rating || !reviewText) {
      return NextResponse.json(
        { error: "Name, rating, and review text are required" },
        { status: 400 }
      );
    }

    const review = new Review({ name, rating, reviewText });
    await review.save();

    return NextResponse.json({ message: "Review saved successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Retrieve all reviews
export async function GET() {
  await connectToDatabase();

  try {
    const reviews = await Review.find({});
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update approval status of a review
export async function PATCH(request) {
  await connectToDatabase();

  try {
    const { id, isApproved } = await request.json();

    const review = await Review.findByIdAndUpdate(id, { isApproved }, { new: true });
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Approval status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a review by ID
export async function DELETE(request) {
  await connectToDatabase();

  try {
    const { id } = await request.json();  // Extracting the ID from the request body
    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    const deletedReview = await Review.findByIdAndDelete(id);  // Delete the review by ID
    if (!deletedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
