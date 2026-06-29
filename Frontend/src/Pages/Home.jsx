import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white flex justify-between items-center px-10 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.iyTZFS1v4vthCmRooji3EwHaCn?pid=Api&P=0&h=180"
            alt="logo"
            className="w-20 rounded"
          />
          <h1 className="text-3xl font-bold">EduPortal</h1>
        </div>

        <ul className="flex items-center gap-8 text-lg">
          <li className="cursor-pointer hover:text-yellow-300">Home</li>
          <li className="cursor-pointer hover:text-yellow-300">About</li>
          <li className="cursor-pointer hover:text-yellow-300">Contact</li>

          <button
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
            onClick={() => navigate("/register")}
          >
            Signup
          </button>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center px-10 py-16 bg-blue-50">
        <div>
          <h1 className="text-5xl font-bold text-blue-800 mb-6">
            Student Project Management System
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            A platform where students can submit projects and teachers can
            review, approve, and manage them efficiently.
          </p>

          <div className="flex gap-4">
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-100"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="students"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold mb-3">
              Project Submission
            </h3>
            <p className="text-gray-600">
              Students can easily upload and manage their academic projects.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-semibold mb-3">
              Teacher Approval
            </h3>
            <p className="text-gray-600">
              Teachers can review, approve, or reject projects with comments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">👨‍🎓</div>
            <h3 className="text-2xl font-semibold mb-3">
              Profile Management
            </h3>
            <p className="text-gray-600">
              Students and teachers can update and maintain their profiles.
            </p>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-700 text-white py-12">
        <div className="grid md:grid-cols-4 text-center gap-8">
          <div>
            <h1 className="text-4xl font-bold">500+</h1>
            <p>Students</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">50+</h1>
            <p>Teachers</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">1000+</h1>
            <p>Projects</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">100%</h1>
            <p>Success Rate</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <h3 className="text-2xl font-bold">EduPortal</h3>
        <p className="mt-2">
          © 2026 All Rights Reserved | Developed by Bharath
        </p>
      </footer>
    </div>
  );
};

export default Home;