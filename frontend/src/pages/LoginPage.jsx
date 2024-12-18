import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaThumbsUp } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <div className="h-full w-full flex bg-white overflow-hidden">
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6">
          <img src={logo} alt="Logo" className="w-32 h-32 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-6">Login into your account</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex gap-4 mb-4">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
              <FcGoogle className="mr-2 text-lg" />
              Google
            </button>

            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-200 transition">
              <FaPhone className="mr-2 text-lg text-blue-500" />
              Phone
            </button>
          </div>

          <div className="w-full max-w-[350px] flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg mb-4 mx-auto focus:ring-2 focus:ring-green-500 outline-none"
          />

          <div className="w-full max-w-md mx-auto relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between items-center w-full max-w-md mx-auto mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">Remember me</span>
            </label>
            <a href="/recover" className="text-red-500 text-sm hover:underline">
              Recover Password
            </a>
          </div>

          <button
            className="w-full max-w-md mx-auto mt-6 px-4 py-2 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 transition"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>

        <div className="w-1/2 relative">
          <img
            src="/login.png"
            alt="Smart Door"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/60 backdrop-blur-lg rounded-lg p-4 flex items-center shadow-lg">
            <FaThumbsUp className="text-green-500 text-2xl mr-2" />
            <div>
              <h3 className="font-bold text-green-500">
                Smart Door Access System
              </h3>
              <p className="text-gray-600 text-sm">
                Today, we create innovative solutions to the challenges that
                consumers face in both their everyday lives and events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;