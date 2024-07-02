import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../lib/axios";

export interface UserInfo {
  avatar_url: string;
  name: string;
  html_url: string;
  login: string;
  bio: string;
  followers: number;
  company?: string;
}

export interface IssuesInfo {
  number: number;
  title: string;
  body: string;
  created_at: string;
  html_url: string;
  comments: number;
  user: UserInfo;
}

interface UserInfoContextType {
  user: UserInfo | null;
  issues: IssuesInfo[];
  fetchUserInfo: () => Promise<void>;
  fetchIssuesInfo: (query?: string) => Promise<void>;
  fetchIssueByNumber: (issueNumber: number) => Promise<IssuesInfo | null>;
}

interface UserInfoProviderProps {
  children: ReactNode;
}

export const UserInfosContext = createContext({} as UserInfoContextType);

export function UserInfoProvider({ children }: UserInfoProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [issues, setIssues] = useState<IssuesInfo[]>([]);

  const fetchUserInfo = useCallback(async () => {
    const response = await api.get(`/users/polaguilherme`);
    setUser(response.data);
  }, []);

  const fetchIssuesInfo = useCallback(async (query?: string) => {
    const response = await api.get(`/repos/polaguilherme/github-blog/issues`, {
      params: {
        q: query,
      },
    });

    if (query) {
      const filteredIssues = response.data.filter((issue: IssuesInfo) =>
        issue.title.toLowerCase().includes(query)
      );
      setIssues(filteredIssues);
    } else {
      setIssues(response.data);
    }
  }, []);

  const fetchIssueByNumber = useCallback(async (id: number) => {
    try {
      const response = await api.get(
        `/repos/polaguilherme/github-blog/issues/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching issue ${id}:`, error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
    fetchIssuesInfo();
  }, [fetchUserInfo, fetchIssuesInfo]);

  return (
    <UserInfosContext.Provider
      value={{
        user,
        issues,
        fetchUserInfo,
        fetchIssuesInfo,
        fetchIssueByNumber,
      }}
    >
      {children}
    </UserInfosContext.Provider>
  );
}
