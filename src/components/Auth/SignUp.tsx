import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext, courses } from '../../context/AppContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skill, setSkill] = useState('');
  const { register, enroll, user } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      if (skill) {
        const course = courses.find(c => c.name === skill);
        if (course) enroll(course.id);
      }
      navigate('/dashboard');
    }
  }, [user, navigate, skill, enroll]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email);
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
            Create your <span className="font-serif italic text-indigo-600">account</span>
          </h2>
          <p className="text-slate-500 font-light text-lg">
            Join the FCN Amilegbe UITH Chapter
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
              <label htmlFor="name" className="block text-sm font-medium text-slate-900">
                Full Name
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl py-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-slate-900 transition-colors sm:text-sm"
                    placeholder="John Doe"
                  />
              </div>
            </div>

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
              <label htmlFor="skill" className="block text-sm font-medium text-slate-900">
                Skill to Learn
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                </div>
                  <select
                    id="skill"
                    name="skill"
                    required
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="block w-full pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl py-3 text-slate-900 focus:ring-0 focus:border-slate-900 transition-colors sm:text-sm appearance-none"
                  >
                    <option value="" disabled className="text-slate-500">Select a skill</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.name} className="text-slate-900">
                        {course.name}
                      </option>
                    ))}
                  </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
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
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl py-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-slate-900 transition-colors sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-4 rounded-xl font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none transition-all active:scale-[0.98]"
              >
                Sign up
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
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/signin" className="text-slate-900 font-medium hover:text-slate-600 transition-colors border-b border-slate-900 pb-0.5">
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
