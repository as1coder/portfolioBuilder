
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../lib/firebase';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // ✅ UI error state
  const [success, setSuccess] = useState(""); // ✅ Success message
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error
    setSuccess(""); // Reset success

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
      });

    

          await setDoc(doc(db, "users", userCredential.user.uid), {
              email: formData.email,
              createdAt: new Date(),
            },{ merge: true });
            router.push("/select-template");
      
          }

     catch (error) {
      // ✅ UI error messages
      if (error.code === 'auth/email-already-in-use') {
        setError("Email already exists! Please login instead.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else {
        setError("Signup failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Create Account</h1>

        {/* ✅ Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            {success}
          </div>
        )}

        {/* ✅ Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
            required
            disabled={loading}
          />

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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : "Sign Up"}
          </button>
        </form>


        <p className="text-gray-300 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}