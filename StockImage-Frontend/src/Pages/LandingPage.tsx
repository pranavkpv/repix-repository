import { motion } from "framer-motion";
import { Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1601786776487-5530c3a6287a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29uZGVyZnVsfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-pink-900/70" />
      </div>

      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-lg shadow-lg fixed top-0 z-20 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            RePix
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/register"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-6 mt-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Your Digital Gallery</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl leading-tight"
        >
          Preserve Your Digital
          <br />
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Treasures
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-xl md:text-2xl text-gray-100 max-w-3xl leading-relaxed"
        >
          A modern platform to upload and showcase your breathtaking photography
          with stunning organization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
          >
            <Upload className="w-6 h-6" />
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold text-lg rounded-2xl border-2 border-white/50 shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Explore Gallery
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
        >
          {[
            { title: "Unlimited Storage", desc: "Upload photos without limits" },
            { title: "Drag & Drop", desc: "Organize with ease" },
            { title: "Secure & Private", desc: "Your memories, protected" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-6 text-center bg-white/90 backdrop-blur-lg shadow-lg z-10 border-t border-purple-100">
        <p className="text-gray-700 font-medium">
          &copy; {new Date().getFullYear()} <span className="text-purple-600 font-bold">Repix</span>. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Made with ❤️ for photographers worldwide
        </p>
      </footer>
    </div>
  );
}
