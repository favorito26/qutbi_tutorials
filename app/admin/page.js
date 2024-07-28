"use client";
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const correctPassword = 'qasim1234'; // Replace with your actual admin password

  useEffect(() => {
    if (isAuthenticated) {
      const fetchEnrollments = async () => {
        try {
          const response = await fetch("/api/enroll");
          if (!response.ok) {
            throw new Error("Error fetching enrollments");
          }
          const data = await response.json();
          setEnrollments(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEnrollments();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/enroll`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Error deleting enrollment');
      }
      // Remove the deleted enrollment from the state
      setEnrollments(enrollments.filter(enrollment => enrollment._id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Enter password"
          className="border rounded px-4 py-2"
        />
        <button
          onClick={handleLogin}
          className="text-white bg-nav font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 ml-3"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Enrollments</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2">Name</th>
            <th className="w-1/4 px-4 py-2">Email</th>
            <th className="w-1/4 px-4 py-2">Mobile</th>
            <th className="w-1/4 px-4 py-2">Course</th>
            <th className="w-1/4 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment._id}>
              <td className="border px-4 py-2">{enrollment.name}</td>
              <td className="border px-4 py-2">{enrollment.email}</td>
              <td className="border px-4 py-2">{enrollment.mobile}</td>
              <td className="border px-4 py-2">{enrollment.course}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(enrollment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
