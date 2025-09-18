import React from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#A8FBD3] px-4">
      <h1 className="text-5xl font-bold text-[#31326F] mb-4 text-center">
        My Notes App
      </h1>

      <p className="text-center text-[#5776cc] text-lg mb-8 max-w-xl">
        A simple full-stack notes app to organize your personal notes.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-[#4FB7B3] text-white px-6 py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#637AB9] text-white px-6 py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          Login
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-[#31326F] text-sm text-center">
        © 2025 Sarthak
      </footer>
    </div>
  );
};

export default LandingPage;
