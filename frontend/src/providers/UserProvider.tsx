import { ReactNode, createContext, useState } from "react";
import User from "../types/User";
type TUserContext = {
  userInfo: User | null;
  clearUserInfo: () => void;
  saveUserInfo: (userInfo: User) => void;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);

const initialUser = localStorage.getItem("userInfo")
  ? (JSON.parse(localStorage.getItem("userInfo")!) as User)
  : null;

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(initialUser);

  const clearUserInfo = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  const saveUserInfo = (userInfo: User) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
  };
  return (
    <UserContext.Provider value={{ userInfo, clearUserInfo, saveUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
