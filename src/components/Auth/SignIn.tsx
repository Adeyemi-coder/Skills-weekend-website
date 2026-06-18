import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      if (user.role === 'user' && !user.enrolledCourseId) {
        navigate('/onboarding');
      } else {
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1000px] h-[650px] bg-white rounded-3xl shadow-2xl shadow-indigo-900/10 flex overflow-hidden"
      >
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 relative z-10">
          <div className="w-full max-w-sm mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">FCN</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
                Welcome back
              </h2>
              <p className="text-slate-500 font-medium">
                Enter your details to access your account.
              </p>
            </motion.div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" strokeWidth={2} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm font-medium outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" strokeWidth={2} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm font-medium outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3.5 px-4 mt-2 rounded-xl font-semibold text-white bg-slate-900 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 w-4 h-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-slate-500 font-medium">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Image/Visuals */}
        <div className="hidden lg:block w-1/2 relative bg-slate-900 overflow-hidden">
          <img 
            src="/auth-bg.png" 
            alt="Abstract Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Empowering the Next Generation
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  Join a community of learners and professionals dedicated to skill acquisition and personal growth. FCN Amilegbe UITH Chapter is your platform for success.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
