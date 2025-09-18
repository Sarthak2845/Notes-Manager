import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authAPI } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import Popup from "../components/Popup";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({ isVisible: false, type: "error", message: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await authAPI.login({
        email: data.email,
        password: data.password,
      });

      login();
      setPopup({
        isVisible: true,
        type: "success",
        message: "Login successful! Redirecting..."
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setPopup({
        isVisible: true,
        type: "error",
        message: error.response?.data?.message || "Invalid credentials"
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#A8FBD3] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border-2">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#31326F] mb-2">Welcome Back</h1>
          <p className="text-[#637AB9]">Sign in to your Notes App account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#31326F] text-white py-3 rounded-lg hover:bg-[#2a2b5f] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-[#637AB9] mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#31326F] font-semibold hover:underline">Create one</Link>
        </p>
      </div>
      
      <Popup
        isVisible={popup.isVisible}
        onClose={() => setPopup({ ...popup, isVisible: false })}
        type={popup.type}
        message={popup.message}
      />
    </div>
  );
};

export default Login;