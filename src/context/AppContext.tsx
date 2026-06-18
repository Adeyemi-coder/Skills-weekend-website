import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  enrolledCourseId?: number;
  attendance: string[]; // dates like YYYY-MM-DD
};

export const courses = [
  { id: 1, name: "Hair making" },
  { id: 2, name: "Tailoring" },
  { id: 3, name: "Catering & Baking" },
  { id: 4, name: "Household production" },
  { id: 5, name: "Instrumental" },
  { id: 6, name: "Coding" },
  { id: 7, name: "Graphic design" },
  { id: 8, name: "Trading" },
  { id: 9, name: "Social Media" },
  { id: 10, name: "Website design" },
];

type AppContextType = {
  user: User | null;
  users: User[];
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, courseId: number, password?: string) => Promise<void>;
  enroll: (courseId: number) => Promise<void>;
  markAttendance: () => Promise<void>;
  getCourseStats: () => {
    courseId: number;
    courseName: string;
    count: number;
  }[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return {
      id: data.id,
      name: data.name || "",
      email: data.email,
      role: data.role as "user" | "admin",
      enrolledCourseId: data.enrolled_course_id,
      attendance: data.attendance || [],
    };
  };

  const fetchAllProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error || !data) {
      console.error("Error fetching all profiles:", error);
      return;
    }
    const mappedUsers: User[] = data.map((d: any) => ({
      id: d.id,
      name: d.name || "",
      email: d.email,
      role: d.role as "user" | "admin",
      enrolledCourseId: d.enrolled_course_id,
      attendance: d.attendance || [],
    }));
    setUsers(mappedUsers);
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        if (profile) {
          setUser(profile);
          if (profile.role === "admin") {
            fetchAllProfiles();
          } else {
            setUsers([profile]);
          }
        }
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        if (profile) {
          setUser(profile);
          if (profile.role === "admin") {
            fetchAllProfiles();
          } else {
            setUsers([profile]);
          }
        }
      } else {
        setUser(null);
        setUsers([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password?: string) => {
    if (password) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log('error', error.message)
        alert(error.message);
        throw error;
      }
    } else {
      alert("Password is required for Supabase authentication.");
    }
  };

  const register = async (name: string, email: string, courseId: number, password?: string) => {
    if (password) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "user",
            courseId,
          },
        },
      });
      if (error) {
        console.error(error);
        alert(error.message);
        throw error;
      } else {
        alert("Registration successful! Please sign in.");
      }
    } else {
      alert("Password is required for Supabase authentication.");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const enroll = async (courseId: number) => {
    if (!user) return;
    // const course = courses.find((c) => c.id === courseId);
    
    // Update in Supabase profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ enrolled_course_id: courseId })
      .eq("id", user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      return;
    }

    const updatedUser = { ...user, enrolledCourseId: courseId };
    setUser(updatedUser);
  };

  const markAttendance = async () => {
    if (!user || !user.enrolledCourseId) return;
    const today = new Date().toISOString().split("T")[0];
    if (user.attendance.includes(today)) {
      alert("Attendance already marked for today!");
      return;
    }
    const newAttendance = [...user.attendance, today];
    
    // Update in Supabase profile
    const { error } = await supabase
      .from("profiles")
      .update({ attendance: newAttendance })
      .eq("id", user.id);

    if (error) {
      console.error("Error marking attendance:", error);
      return;
    }

    const updatedUser = { ...user, attendance: newAttendance };
    setUser(updatedUser);
  };

  const getCourseStats = () => {
    return courses.map((course) => {
      const count = users.filter(
        (u) => u.enrolledCourseId === course.id,
      ).length;
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
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
