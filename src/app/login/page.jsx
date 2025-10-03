"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from "firebase/firestore"; // ✅ getDoc use karo

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // ✅ CORRECT: getDoc use karo read karne ke liye
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {}; // ✅ exists() correct hai
      
      if (userData.onboarded) {
        // Already onboarded - direct dashboard
        router.push("/dashboard");
      } else {
        // Not onboarded - template selection
        router.push("/select-template");
      }

    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please check your credentials.");
      } else if (error.code === 'auth/user-not-found') {
        setError("User not found! Please sign up first.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Wrong password! Please try again.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else {
        setError("Login failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
            {error.includes("not found") && (
              <Link href="/signup" className="ml-2 text-purple-400 hover:text-purple-300 underline">
                Sign up here
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
            required
            disabled={loading}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition pr-10"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer py-3 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-gray-300 text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}