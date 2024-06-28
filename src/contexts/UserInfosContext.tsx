import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface UserInfo {
  avatar_url: string;
  name: string;
  html_url: string;
  login: string;
  bio: string;
  followers: number;
  company?: string;
}

interface UserInfoContextType {
  user: UserInfo | null;
  fetchUserInfo: (data: UserInfo) => Promise<void>;
}

interface UserInfoProviderProps {
  children: ReactNode;
}

export const UserInfosContext = createContext({} as UserInfoContextType);

export function UserInfoProvider({ children }: UserInfoProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null);

  async function fetchUserInfo() {
    const response = await api.get(`/users/polaguilherme`);
    setUser(response.data);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserInfosContext.Provider value={{ user, fetchUserInfo }}>
      {children}
    </UserInfosContext.Provider>
  );
}
