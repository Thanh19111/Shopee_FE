import React, {createContext, type ReactNode, useState} from "react";
import {getAccessTokenFromLS, getProfileFromLS} from "../utils/auth.ts";
import type {User} from "../types/user.type.ts";

interface AppContextInterface{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile);

  return <AppContext.Provider
  value={{isAuthenticated, profile, setProfile,
  setIsAuthenticated}}>{children}</AppContext.Provider>
}