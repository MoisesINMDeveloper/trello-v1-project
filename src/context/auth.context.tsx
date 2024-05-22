"use client";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserInfoInterface {
  email: string;
  name: string;
  username: string;
  password: string;
  verified: boolean;
  _id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  emailConfirm: string;
  setEmailConfirm: Dispatch<SetStateAction<string>>;
  userInfo: UserInfoInterface;
  setUserInfo: Dispatch<SetStateAction<UserInfoInterface>>;
  passwordToConfirm: string;
  setPasswordToConfirm: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailConfirm, setEmailConfirm] = useState<string>("");
  const [passwordToConfirm, setPasswordToConfirm] = useState<string>("");

  const [userInfo, setUserInfo] = useState<UserInfoInterface>({
    email: "",
    name: "",
    username: "",
    verified: false,
    password: "",
    _id: "",
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        emailConfirm,
        setEmailConfirm,
        userInfo,
        setUserInfo,
        passwordToConfirm,
        setPasswordToConfirm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
