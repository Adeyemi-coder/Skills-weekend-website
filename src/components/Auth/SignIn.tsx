import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const { login, user } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="h-[2px] w-12 bg-slate-900"></div>
          </div>
          <h2 className="text-4xl font-medium tracking-tight text-slate-900 mb-2">
            Welcome <span className="font-serif italic text-indigo-600">back</span>
          </h2>
          <p className="text-slate-500 font-light text-lg">
            Sign in to access your FCN account.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md mb-16"
      >
        <div className="bg-white py-10 px-6 sm:px-12 border border-slate-200 sm:rounded-[2rem]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                Email address
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl py-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-slate-900 transition-colors sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-900">
                Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl py-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-slate-900 transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-white border-slate-300 rounded text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-slate-900 hover:text-slate-700 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-4 rounded-xl font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none transition-all active:scale-[0.98]"
              >
                Sign in
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-light tracking-wide uppercase text-xs">
                  New to the fellowship?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/signup" className="text-slate-900 font-medium hover:text-slate-600 transition-colors border-b border-slate-900 pb-0.5">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
