import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

export type UserRole = 'Learner' | 'Instructor' | 'Administrator';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: UserStatus;
  joinedDate: string;
  password?: string; // stored for mock login verification
}

interface AuthContextType {
  user: User | null;
  users: User[];
  isLoading: boolean;
  forgotPasswordToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<string | null>;
  resetPassword: (token: string, newPass: string) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
  updateProfile: (name: string, email: string, avatar: string) => Promise<boolean>;
  updateUserRole: (userId: string, role: UserRole) => Promise<boolean>;
  toggleUserStatus: (userId: string) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'David',
    email: 'admin@trainify.ai',
    role: 'Administrator',
    avatar: '👨‍💼',
    status: 'Active',
    joinedDate: '2026-01-15',
    password: 'password123',
  },
  {
    id: '2',
    name: 'Emily Watson',
    email: 'emily@trainify.ai',
    role: 'Learner',
    avatar: '👩‍🎓',
    status: 'Active',
    joinedDate: '2026-03-10',
    password: 'password123',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@trainify.ai',
    role: 'Instructor',
    avatar: '👨‍🏫',
    status: 'Active',
    joinedDate: '2026-02-01',
    password: 'password123',
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@trainify.ai',
    role: 'Learner',
    avatar: '👩‍⚕️',
    status: 'Pending',
    joinedDate: '2026-05-20',
    password: 'password123',
  },
  {
    id: '5',
    name: 'Sarah Connor',
    email: 'sarah@trainify.ai',
    role: 'Learner',
    avatar: '🥋',
    status: 'Inactive',
    joinedDate: '2026-04-18',
    password: 'password123',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgotPasswordToken, setForgotPasswordToken] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    setIsLoading(false);

    if (foundUser) {
      if (foundUser.status === 'Inactive') {
        Alert.alert('Access Denied', 'Your account has been deactivated. Please contact support.');
        return false;
      }
      setUser(foundUser);
      return true;
    } else {
      Alert.alert('Authentication Failed', 'Invalid email or password.');
      return false;
    }
  };

  const register = async (name: string, email: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      setIsLoading(false);
      Alert.alert('Registration Failed', 'Email is already registered.');
      return false;
    }

    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      role,
      avatar: role === 'Administrator' ? '👨‍💼' : role === 'Instructor' ? '👨‍🏫' : '🧑‍🎓',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      password: 'password123', // Default password for newly registered users in simulator
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<string | null> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    setIsLoading(false);

    if (foundUser) {
      const mockToken = String(Math.floor(100000 + Math.random() * 900000));
      setForgotPasswordToken(mockToken);
      return mockToken;
    } else {
      Alert.alert('Error', 'No account found with this email.');
      return null;
    }
  };

  const resetPassword = async (token: string, newPass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    if (token === forgotPasswordToken) {
      // For simulator, reset password for all users or the one who requested
      Alert.alert('Success', 'Password has been reset successfully. Please login.');
      setForgotPasswordToken(null);
      return true;
    } else {
      Alert.alert('Invalid Token', 'The verification code you entered is incorrect.');
      return false;
    }
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    if (!user) return false;

    if (user.password !== oldPass) {
      Alert.alert('Error', 'Current password is correct.');
      return false;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, password: newPass } : u))
    );
    setUser((prev) => (prev ? { ...prev, password: newPass } : null));
    Alert.alert('Success', 'Password changed successfully.');
    return true;
  };

  const updateProfile = async (name: string, email: string, avatar: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    if (!user) return false;

    // Check email uniqueness if email changed
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        Alert.alert('Error', 'This email is already in use by another account.');
        return false;
      }
    }

    const updatedUser = { ...user, name, email, avatar };
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    setUser(updatedUser);
    Alert.alert('Success', 'Profile updated successfully.');
    return true;
  };

  const updateUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
    // If current logged in user role was changed, update state
    if (user && user.id === userId) {
      setUser((prev) => (prev ? { ...prev, role } : null));
    }
    return true;
  };

  const toggleUserStatus = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus: UserStatus = u.status === 'Active' ? 'Inactive' : 'Active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    return true;
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isLoading,
        forgotPasswordToken,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        changePassword,
        updateProfile,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
