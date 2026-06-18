
import { useAppContext, courses } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';
import { 
  CheckCircle, 
  BookOpen, 
  Calendar, 
  Award, 
  Bell, 
  FileText, 
  Clock, 
  Settings,
  ArrowRight
} from 'lucide-react';

export default function UserDashboard() {
  const { user, enroll, markAttendance } = useAppContext();

  if (!user) return <Navigate to="/signin" />;
  if (user.role === 'admin') return <Navigate to="/admin" />;

  const today = new Date().toISOString().split('T')[0];
  const hasMarkedAttendanceToday = user.attendance.includes(today);
  const enrolledCourse = courses.find(c => c.id === user.enrolledCourseId);
  const progressPercent = Math.min(100, Math.round((user.attendance.length / 30) * 100));

  // Calendar Logic
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth];

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    // Format: YYYY-MM-DD to match the generic toISOString().split('T')[0] pattern used in markAttendance
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dateStr === today;
    const isAttended = user.attendance.includes(dateStr);
    return { day, dateStr, isToday, isAttended };
  });
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Mock data for new features
  const nextClass = { day: "Tomorrow", time: "10:00 AM", topic: "Introduction & Fundamentals" };
  const announcements = [
    { id: 1, date: "Oct 24", title: "Welcome to the new semester", isNew: true },
    { id: 2, date: "Oct 20", title: "Please bring your materials on Friday", isNew: false }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 px-6 lg:px-8 pb-20 font-sans text-slate-900 selection:bg-indigo-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 mt-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-slate-900"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-900">Student Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-2">
              Welcome back, <span className="font-serif italic text-indigo-600 pr-2">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-xl text-slate-500 font-light">
              Here is what's happening with your program today.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
               <Bell className="w-5 h-5" strokeWidth={1.5} />
             </button>
             <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
               <Settings className="w-5 h-5" strokeWidth={1.5} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile & Quick Stats */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Profile Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-serif italic mb-6">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-medium text-slate-900 mb-1">{user.name}</h2>
              <p className="text-slate-500 font-light mb-8">{user.email}</p>
              
              <div className="w-full flex flex-col gap-1 text-left">
                 <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Student ID</span>
                    <span className="font-medium text-sm text-slate-900">{user.id}</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Role</span>
                    <span className="font-medium text-sm text-slate-900 capitalize">{user.role}</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Enrolled</span>
                    <span className="font-medium text-sm text-slate-900">{enrolledCourse ? 'Yes' : 'No'}</span>
                 </div>
              </div>
            </div>

            {/* Schedule / Next Class */}
            {enrolledCourse && (
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <Clock className="w-48 h-48 -mr-10 -mt-10" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xs uppercase tracking-[0.15em] text-indigo-300 font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Next Class
                  </h3>
                  <p className="text-3xl font-light mb-1">{nextClass.day}</p>
                  <p className="text-xl font-medium text-indigo-400 mb-8">{nextClass.time}</p>
                  <div className="border-t border-slate-700/50 pt-5">
                    <p className="text-slate-400 text-sm font-light">Topic:</p>
                    <p className="text-white font-medium">{nextClass.topic}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Announcements */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
               <h3 className="text-lg font-medium text-slate-900 mb-6 flex items-center gap-2">
                 <Bell className="w-5 h-5 text-slate-400" /> Announcements
               </h3>
               <div className="space-y-5">
                 {announcements.map((a) => (
                   <div key={a.id} className="group cursor-pointer">
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{a.date}</span>
                       {a.isNew && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>}
                     </div>
                     <p className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors leading-relaxed">
                       {a.title}
                     </p>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* Right Column: Course, Attendance, Materials */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Main Course Card */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 flex flex-col justify-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-indigo-600" /> Your Program
              </h2>
              
              {enrolledCourse ? (
                <div>
                   <h3 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 leading-tight">{enrolledCourse.name}</h3>
                   <p className="text-lg text-slate-500 font-light mb-12 max-w-2xl leading-relaxed">
                     You are actively enrolled in the {enrolledCourse.name} mastery program. Follow your progress and access your study materials below.
                   </p>
                   
                   <div className="bg-[#fafafa] p-6 md:p-8 rounded-[2rem] border border-slate-100 mb-8">
                     <div className="flex justify-between items-end mb-4">
                       <div>
                         <p className="text-sm font-medium text-slate-500 mb-1">Course Progress</p>
                         <p className="text-3xl font-medium text-slate-900">{progressPercent}%</p>
                       </div>
                       <p className="text-sm text-slate-400 font-light hidden sm:block">Based on 30-day curriculum</p>
                     </div>
                     <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out"
                         style={{ width: `${progressPercent}%` }}
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <FileText className="w-6 h-6" strokeWidth={1.5} />
                          </div>
                          <span className="font-medium text-slate-900">Course Materials</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                      </button>
                      <button className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                            <Award className="w-6 h-6" strokeWidth={1.5} />
                          </div>
                          <span className="font-medium text-slate-900">Achievements</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                      </button>
                   </div>
                </div>
              ) : (
                <div className="text-center py-12 md:py-20">
                   <div className="w-24 h-24 bg-[#fafafa] border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                     <BookOpen className="w-10 h-10 text-slate-300" strokeWidth={1} />
                   </div>
                   <h3 className="text-3xl font-medium text-slate-900 mb-4">No Active Course</h3>
                   <p className="text-lg text-slate-500 font-light mb-12 max-w-md mx-auto leading-relaxed">
                     You haven't enrolled in a program yet. Select one of our available skills to begin your journey.
                   </p>
                   <div className="max-w-md mx-auto space-y-3">
                     {courses.map(course => (
                       <button
                         key={course.id}
                         onClick={() => enroll(course.id)}
                         className="w-full text-left px-6 py-5 rounded-2xl border border-slate-200 hover:border-slate-900 transition-colors flex justify-between items-center group bg-white hover:shadow-md"
                       >
                         <span className="font-medium text-slate-700 group-hover:text-slate-900 text-lg">{course.name}</span>
                         <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-all transform group-hover:translate-x-1" />
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </div>

            {/* Attendance Section */}
            {enrolledCourse && (
              <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-emerald-600" /> Attendance Tracking
                    </h2>
                    <p className="text-slate-900 text-2xl font-medium mt-4">Consistency is key.</p>
                  </div>
                  
                  {hasMarkedAttendanceToday ? (
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-5 h-5" /> Marked for Today
                    </div>
                  ) : (
                    <button
                      onClick={markAttendance}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all active:scale-[0.98] shadow-md"
                    >
                      <CheckCircle className="w-5 h-5" /> Mark Present
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="p-8 bg-[#fafafa] rounded-3xl border border-slate-100 flex flex-col justify-center items-center text-center">
                    <p className="text-5xl md:text-6xl font-medium text-slate-900 mb-2">{user.attendance.length}</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Days Attended</p>
                  </div>
                  <div className="p-8 bg-[#fafafa] rounded-3xl border border-slate-100 flex flex-col justify-center items-center text-center">
                    <p className="text-5xl md:text-6xl font-light text-slate-300 mb-2">{Math.max(0, 30 - user.attendance.length)}</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Days Left</p>
                  </div>
                </div>

                {/* Calendar View */}
                <div className="border-t border-slate-100 pt-8 mt-4">
                  <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">{currentMonthName} {currentYear}</h4>
                  
                  <div className="grid grid-cols-7 gap-2 text-center mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {blanks.map(blank => (
                      <div key={`blank-${blank}`} className="aspect-square rounded-xl bg-transparent"></div>
                    ))}
                    
                    {calendarDays.map(({ day, isToday, isAttended }) => (
                      <button
                        key={day}
                        onClick={() => {
                          if (isToday && !isAttended) markAttendance();
                        }}
                        disabled={!isToday || isAttended}
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl font-medium transition-all relative group
                          ${isAttended ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200 shadow-sm' : 
                            isToday ? 'bg-white text-slate-900 border-2 border-slate-900 shadow-md hover:bg-slate-50 cursor-pointer hover:scale-105 active:scale-95' : 
                            'bg-[#fafafa] text-slate-400 border border-slate-100 cursor-not-allowed opacity-60 hover:opacity-100'}
                        `}
                      >
                        <span className={`${isToday || isAttended ? 'text-lg' : 'text-base'}`}>{day}</span>
                        
                        {isAttended && <CheckCircle className="w-3 h-3 text-emerald-500 mt-1" strokeWidth={3} />}
                        {isToday && !isAttended && <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1"></span>}
                        
                        {/* Tooltip-like effect for non-clickable days */}
                        {!isToday && !isAttended && (
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-light py-1.5 px-3 rounded-lg -top-10 whitespace-nowrap pointer-events-none transition-all z-10 shadow-xl">
                            Cannot mark past/future days
                          </div>
                        )}
                        {isToday && !isAttended && (
                          <div className="absolute opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-light py-1.5 px-3 rounded-lg -top-10 whitespace-nowrap pointer-events-none transition-all z-10 shadow-xl">
                            Click to mark present!
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
