import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../lib/Zustand/authStore";

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Kirish
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
