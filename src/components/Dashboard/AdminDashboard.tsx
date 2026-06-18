
import { useAppContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BarChart3, TrendingUp, Award } from 'lucide-react';

export default function AdminDashboard() {
  const { user, users, getCourseStats } = useAppContext();

  if (!user) return <Navigate to="/signin" />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" />;

  const courseStats = getCourseStats();
  const totalStudents = users.filter(u => u.role === 'user').length;
  const totalEnrolled = users.filter(u => u.role === 'user' && u.enrolledCourseId).length;
  const totalAttendances = users.reduce((sum, u) => sum + (u.attendance?.length || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Overview of student enrollment and attendance.</p>
          </div>
          <div className="p-4 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center gap-3">
            <Award className="w-8 h-8" />
            <span className="font-bold text-xl">Admin Mode</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Total Registered</p>
              <p className="text-3xl font-bold text-slate-900">{totalStudents}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Total Enrolled</p>
              <p className="text-3xl font-bold text-slate-900">{totalEnrolled}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-500 font-medium">Total Attendances</p>
              <p className="text-3xl font-bold text-slate-900">{totalAttendances}</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-500" />
              Enrollment by Course
            </h2>
            <div className="space-y-4">
              {courseStats.sort((a, b) => b.count - a.count).map(stat => (
                <div key={stat.courseId} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-medium text-slate-800">{stat.courseName}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 bg-indigo-100 rounded-full w-24 overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${totalStudents > 0 ? (stat.count / totalStudents) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="font-bold text-indigo-700 w-8 text-right">{stat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-500" />
              Recent Students
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-sm">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Course</th>
                    <th className="pb-3 font-semibold text-right">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.filter(u => u.role === 'user').map(student => {
                    const course = courseStats.find(c => c.courseId === student.enrolledCourseId);
                    return (
                      <tr key={student.id}>
                        <td className="py-4 text-sm font-medium text-slate-900">{student.name}</td>
                        <td className="py-4 text-sm text-slate-600">{course ? course.courseName : 'Not Enrolled'}</td>
                        <td className="py-4 text-sm text-slate-900 font-bold text-right">
                          <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-xs">
                            {student.attendance?.length || 0} days
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {users.filter(u => u.role === 'user').length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500 text-sm">
                        No students registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
