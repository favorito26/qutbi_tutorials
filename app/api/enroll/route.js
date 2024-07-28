import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const MONGODB_URI = process.env.MONGODB_URI;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

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

const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);

async function sendConfirmationEmail(to, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"qutbi Tutorials" <qutbituts53@gmail.com>',
    to: [to, 'qutbituts53@gmail.com'],
    subject: "Enrollment Successful",
    text: `Dear ${name},\n\nYour enrollment was successful! Thank you for enrolling in our course.\n\nBest regards,\nQutbi Tutorials`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function POST(req) {
  await connectToDatabase();
  try {
    const { name, email, mobile, course } = await req.json();
    const enrollment = new Enrollment({
      name,
      email,
      mobile,
      course,
    });
    await enrollment.save();

    // Send confirmation email
    sendConfirmationEmail(email, name);

    return NextResponse.json(
      { message: "Enrollment successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving enrollment:", error);
    return NextResponse.json(
      { message: "Error saving enrollment", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectToDatabase();
  try {
    const enrollments = await Enrollment.find({});
    return NextResponse.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { message: "Error fetching enrollments", error: error.message },
      { status: 500 }
    );
  }
}
