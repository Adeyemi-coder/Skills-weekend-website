import React, { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  enrolledCourseId?: number;
  attendance: string[]; // dates like YYYY-MM-DD
};

export const courses = [
  { id: 1, name: 'Hair making' },
  { id: 2, name: 'Tailoring' },
  { id: 3, name: 'Catering & Baking' },
  { id: 4, name: 'Household production' },
  { id: 5, name: 'Instrumental' },
  { id: 6, name: 'Coding' },
  { id: 7, name: 'Graphic design' },
  { id: 8, name: 'Trading' },
  { id: 9, name: 'Social Media' },
  { id: 10, name: 'Website design' },
];

type AppContextType = {
  user: User | null;
  users: User[];
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  enroll: (courseId: number) => void;
  markAttendance: () => void;
  getCourseStats: () => { courseId: number; courseName: string; count: number }[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Initialize from local storage
  useEffect(() => {
    const storedUsers = localStorage.getItem('app_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Create default admin and user accounts
      const defaultAdmin: User = {
        id: '1',
        name: 'Master Admin',
        email: 'admin@fcn.com',
        role: 'admin',
        attendance: [],
      };

      const defaultUser: User = {
        id: '2',
        name: 'Jane Doe',
        email: 'user@fcn.com',
        role: 'user',
        enrolledCourseId: 6, // Coding
        attendance: [new Date().toISOString().split('T')[0]], // prepopulate with today's attendance
      };

      const initialUsers = [defaultAdmin, defaultUser];
      setUsers(initialUsers);
      localStorage.setItem('app_users', JSON.stringify(initialUsers));
    }

    const activeUser = localStorage.getItem('app_active_user');
    if (activeUser) {
      setUser(JSON.parse(activeUser));
    }
  }, []);

  const saveState = (newUsers: User[], activeUser: User | null) => {
    setUsers(newUsers);
    localStorage.setItem('app_users', JSON.stringify(newUsers));
    if (activeUser) {
      setUser(activeUser);
      localStorage.setItem('app_active_user', JSON.stringify(activeUser));
    } else {
      setUser(null);
      localStorage.removeItem('app_active_user');
    }
  };

  const login = (email: string) => {
    const found = users.find((u) => u.email === email);
    if (found) {
      saveState(users, found);
    } else {
      alert("User not found!");
    }
  };

  const register = (name: string, email: string) => {
    if (users.find((u) => u.email === email)) {
      alert("Email already registered!");
      return;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      attendance: [],
    };
    const newUsers = [...users, newUser];
    saveState(newUsers, newUser);
  };

  const logout = () => {
    saveState(users, null);
  };

  const enroll = (courseId: number) => {
    if (!user) return;
    const updatedUser = { ...user, enrolledCourseId: courseId };
    const newUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    saveState(newUsers, updatedUser);
  };

  const markAttendance = () => {
    if (!user || !user.enrolledCourseId) return;
    const today = new Date().toISOString().split('T')[0];
    if (user.attendance.includes(today)) {
      alert("Attendance already marked for today!");
      return;
    }
    const updatedUser = { ...user, attendance: [...user.attendance, today] };
    const newUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    saveState(newUsers, updatedUser);
  };

  const getCourseStats = () => {
    return courses.map(course => {
      const count = users.filter(u => u.enrolledCourseId === course.id).length;
      return { courseId: course.id, courseName: course.name, count };
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        register,
        enroll,
        markAttendance,
        getCourseStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
